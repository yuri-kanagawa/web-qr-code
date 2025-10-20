import { Language, QrCode } from '@/domains'
import { FormButton } from '@/ui/fragments/form/FormButton'
import { FormCard } from '@/ui/fragments/form/FormCard'
import { UrlTextField } from '@/ui/fragments/textField'
import { FC, useCallback, useState } from 'react'

type Props = {
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const UrlFormSimple: FC<Props> = ({ language, qr, onChange }) => {
  const [url, setUrl] = useState(qr.url?.value || '')

  // URLフィールドの変更ハンドラー
  const handleUrlChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setUrl(newValue)

      // QrCodeを更新
      const newQr = qr.changeUrl(newValue)
      onChange(newQr)
    },
    [qr, onChange]
  )

  // ドメイン層でバリデーション
  const currentQr = qr.changeUrl(url)
  const isUrlValid = currentQr.isFieldValid('url')
  const urlErrorMessage = currentQr.getFieldErrorMessage('url')
  const isFormValid = currentQr.isValidForm

  return (
    <FormButton
      isValid={isFormValid}
      qr={currentQr}
      language={language}
      onChange={onChange}
    >
      <FormCard cardProps={{ sx: { p: 2 } }}>
        <UrlTextField
          isRequired
          value={url}
          onChange={handleUrlChange}
          error={!isUrlValid}
          fullWidth
          helperText={urlErrorMessage}
        />
      </FormCard>
    </FormButton>
  )
}

