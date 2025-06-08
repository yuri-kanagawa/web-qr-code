import { useNotify, useQrCode, useQrScanner } from '@/hooks'
import { RegisterQrCodeUrlSchema } from '@/ui/pages/Url/hooks'
import { useEffect, useMemo } from 'react'
import {
  registerQrCodePhoneSchema,
  RegisterQrCodePhoneSchema
} from '@/ui/pages/Phone/hooks/zod'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


export const usePhoneQrCodeForm = () => {
  const { ref, onConfirm, onDownload } = useQrCode()

  const defaultValues: RegisterQrCodePhoneSchema = useMemo(() => {
    return {
      phoneNumber: ''
    }
  }, [])
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
    reset(defaultValues)
  }, [defaultValues, reset])

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
