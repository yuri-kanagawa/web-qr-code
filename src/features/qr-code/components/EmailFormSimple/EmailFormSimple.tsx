import { Language, QrCode } from '@/domains'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { EmailTextField } from '@/ui/fragments/textField'
import { FC, useCallback, useState } from 'react'

type Props = {
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const EmailFormSimple: FC<Props> = ({ language, qr, onChange }) => {
  const [email, setEmail] = useState(qr.email?.value || '')
  const [subject, setSubject] = useState(qr.subject?.value || '')
  const [body, setBody] = useState(qr.body?.value || '')

  // フィールドの変更ハンドラー
  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setEmail(newValue)
      updateQrCode(newValue, subject, body)
    },
    [subject, body]
  )

  const handleSubjectChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setSubject(newValue)
      updateQrCode(email, newValue, body)
    },
    [email, body]
  )

  const handleBodyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setBody(newValue)
      updateQrCode(email, subject, newValue)
    },
    [email, subject]
  )

  const updateQrCode = useCallback(
    (emailValue: string, subjectValue: string, bodyValue: string) => {
      const newQr = qr
        .changeToEmail()
        .updateData((data) =>
          data
            .changeEmail(emailValue)
            .changeSubject(subjectValue)
            .changeBody(bodyValue)
        )
      onChange(newQr)
    },
    [qr, onChange]
  )

  // ドメイン層でバリデーション
  const currentQr = qr
    .changeToEmail()
    .updateData((data) =>
      data.changeEmail(email).changeSubject(subject).changeBody(body)
    )

  const isEmailValid = currentQr.isFieldValid('email')
  const emailErrorMessage = currentQr.getFieldErrorMessage('email')
  const isFormValid = currentQr.isValidForm

  return (
    <FormButton
      isValid={isFormValid}
      qr={currentQr}
      language={language}
      onChange={onChange}
    >
      <FormCard cardProps={{ sx: { p: 2 } }}>
        <EmailTextField
          isRequired
          value={email}
          onChange={handleEmailChange}
          error={!isEmailValid}
          fullWidth
          helperText={emailErrorMessage}
        />
      </FormCard>
    </FormButton>
  )
}

