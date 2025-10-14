import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { registerQrCodeSmsSchema, RegisterQrCodeSmsSchema } from './zod'

interface Props {
  language: Language
  phoneNumber: string
  body: string
}

export const useSmsQrCodeForm = ({ language, phoneNumber, body }: Props) => {
  const { ref, onConfirm, onDownload, resetPhoneNumber, resetBody } =
    useQrCode()
  const defaultValues: RegisterQrCodeSmsSchema = useMemo(() => {
    return {
      phoneNumber,
      body
    }
  }, [phoneNumber, body])
  const {
    handleSubmit,
    trigger,
    setFocus,
    getFieldState,
    control,
    reset,
    ...rest
  } = useForm<RegisterQrCodeSmsSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(registerQrCodeSmsSchema)
  })
  useEffect(() => {
    if (phoneNumber || body) {
      reset(defaultValues)
      resetPhoneNumber()
      resetBody()
    }
  }, [defaultValues, reset, resetPhoneNumber, resetBody])

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeSmsSchema> = (
    errors
  ) => {
    console.error(errors)
    if (errors.phoneNumber) {
      return setFocus('phoneNumber')
    }

    if (errors.body) {
      return setFocus('body')
    }
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    await trigger()
    const { error } = getFieldState('phoneNumber')
    if (error) {
      setFocus('phoneNumber')
      return
    }
    return await onConfirm()
  }

  return {
    ref,
    control,
    onConfirm: handleConfirm,
    onDownload: handleSubmit(onDownload, submitErrorHandler),

    ...rest
  }
}
