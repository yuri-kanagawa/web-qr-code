import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import { useEffect, useMemo } from 'react'

import { addQueryParameter } from '@/utils/queryParameter'
import { useQrCode } from '@/hooks'
import { RegisterQrCodeEmailSchema, registerQrCodeEmailSchema } from './zod'

export const useEmailQRCodeForm = () => {
  const {ref, onConfirm, onDownload } = useQrCode()

  const defaultValues: RegisterQrCodeEmailSchema = useMemo(() => {
    return {
      email: '',
      subject: '',
      body: ''
    }
  }, [])

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
    setFocus,
    ...rest
  } = useForm<RegisterQrCodeEmailSchema>({
    resolver: zodResolver(registerQrCodeEmailSchema),
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
  const currentEmail = watch('email')

  useEffect(() => {
    if (errors.email) return
    addQueryParameter({ email: currentEmail })
  }, [errors, currentEmail])
  const handleConfirm = async (): Promise<string | undefined> => {
    if (!isValid) {
      submitErrorHandler(errors)
      return
    }
    return await onConfirm()
  }
  return {
    ref,
    onConfirm: handleConfirm,
    onDownload: handleSubmit(onDownload, submitErrorHandler),
    ...rest
  }
}
