import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'

import { useEffect, useMemo } from 'react'

import { Language } from '@/domains'
import { Email } from '@/domains/valueObjects/email'
import { Subject } from '@/domains/valueObjects/subject'
import { Body } from '@/domains/valueObjects/body'
import { useQrCode } from '@/hooks'
import { createRegisterQrCodeEmailSchema, type RegisterQrCodeEmailSchema } from './zod'
type Props = {
  language: Language
  email?: string
  subject?: string
  body?: string
}

export const useEmailQRCodeForm = ({
  language,
  email = '',
  subject = '',
  body = ''
}: Props) => {
  const { ref, onConfirm, onDownload } = useQrCode(language)

  const defaultValues: RegisterQrCodeEmailSchema = useMemo(() => {
    const emailResult = email ? Email.create(email, language) : null
    const subjectResult = subject ? Subject.create(subject, language) : null
    const bodyResult = body ? Body.create(body, language) : null
    
    return {
      email: emailResult?.isSuccess ? emailResult.email! : Email.empty(language),
      subject: subjectResult?.isSuccess ? subjectResult.subject! : Subject.empty(language),
      body: bodyResult?.isSuccess ? bodyResult.body! : Body.empty(language),
      language: language.value
    }
  }, [language, email, subject, body])

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
    return await onConfirm()
  }
  return {
    ref,
    onConfirm: handleConfirm,
    onDownload: handleSubmit(onDownload, submitErrorHandler),
    ...rest,
    watch
  }
}
