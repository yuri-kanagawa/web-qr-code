import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'

import { useEffect, useMemo } from 'react'

import { Language, QrCode } from '@/domains'
import { Email } from '@/domains/valueObjects/email'
import { Subject } from '@/domains/valueObjects/subject'
import { Body } from '@/domains/valueObjects/body'
import { createRegisterQrCodeEmailSchema, type RegisterQrCodeEmailSchema } from './zod'
type Props = {
  language: Language
  qr: QrCode
}

export const useEmailQRCodeForm = ({
  language,
  qr
}: Props) => {

  const defaultValues: RegisterQrCodeEmailSchema = useMemo(() => {
    const emailResult = qr.email?.value ? Email.create(qr.email.value, language) : null
    const subjectResult = qr.subject?.value ? Subject.create(qr.subject.value, language) : null
    const bodyResult = qr.body?.value ? Body.create(qr.body.value, language) : null
    
    return {
      email: emailResult?.isSuccess ? emailResult.email! : Email.empty(language),
      subject: subjectResult?.isSuccess ? subjectResult.subject! : Subject.empty(language),
      body: bodyResult?.isSuccess ? bodyResult.body! : Body.empty(language),
      language: language.value
    }
  }, [language, qr.email, qr.subject, qr.body])

  const schema = useMemo(() => createRegisterQrCodeEmailSchema(language), [language])

  const { handleSubmit, reset, watch, getFieldState, setFocus, ...rest } =
    useForm<RegisterQrCodeEmailSchema>({
      resolver: zodResolver(schema),
      mode: 'onChange',
      reValidateMode: 'onSubmit',
      defaultValues
    })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeEmailSchema> = (
    errors
  ) => {
    console.error(errors)
    if (errors.email) {
      return setFocus('email')
    }
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    const { error: emailError } = getFieldState('email')
    if (emailError) {
      submitErrorHandler(emailError)
      return
    }
    return "qr-generated"
  }
  return {
    onConfirm: handleConfirm,
    onDownload: () => console.log("Download functionality temporarily disabled"),
    ...rest,
    watch
  }
}
