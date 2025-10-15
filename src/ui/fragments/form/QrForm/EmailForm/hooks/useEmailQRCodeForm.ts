import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'

import { useEffect, useMemo } from 'react'

import { Language } from '@/domains'
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
    return {
      email,
      subject,
      body,
      language: language.value
    }
  }, [language])

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
