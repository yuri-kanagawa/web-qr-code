import { useNotify, useQrCode, useQrScanner } from '@/hooks'
import { RegisterQrCodeUrlSchema } from '@/ui/pages/url/hooks'
import { useEffect, useMemo } from 'react'
import {
  registerQrCodePhoneSchema,
  RegisterQrCodePhoneSchema
} from '@/ui/pages/phone/hooks/zod'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { phoneNumber } from './zod';
import { removeQueryParamFromCurrentURL } from '@/utils/queryParameter'


export const usePhoneQrCodeForm = () => {
  const { ref, onConfirm, onDownload, phoneNumber, resetPhoneNumber } = useQrCode()

  const defaultValues: RegisterQrCodePhoneSchema = useMemo(() => {
    return {
      phoneNumber
    }
  }, [phoneNumber])
  const {
    handleSubmit,
    reset,
    control,
    watch,
    trigger,
    formState: { errors, isValid },
    getFieldState,
    setFocus,
    ...rest
  } = useForm<RegisterQrCodePhoneSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(registerQrCodePhoneSchema)
  })
  useEffect(() => {
    if (phoneNumber) {
      reset(defaultValues)
      resetPhoneNumber()
    }
  }, [phoneNumber, reset, defaultValues])

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeUrlSchema> = (
    errors
  ) => {
    console.error(errors)
    if (errors.url) {
      return setFocus('phoneNumber')
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
    control,
    watch,
    ref,
    onConfirm: handleConfirm,
    onDownload: handleSubmit(onDownload, submitErrorHandler),
    ...rest
  }
}
