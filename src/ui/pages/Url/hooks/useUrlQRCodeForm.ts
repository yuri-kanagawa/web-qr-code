import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import {
  RegisterQrCodeUrlSchema,
  registerQrCodeUrlSchema
} from '@/ui/pages/Url/hooks/zod'

import { MutableRefObject, useEffect, useMemo, useRef } from 'react'

import { useQrCode } from '@/hooks'

export const useUrlQRCodeForm = () => {
  const { ref, onConfirm, onDownload } = useQrCode()

  const defaultValues: RegisterQrCodeUrlSchema = useMemo(() => {
    return {
      url: ''
    }
  }, [])

  const {
    handleSubmit,
    reset,
    control,
    watch,
    trigger,
    getFieldState,
    formState: { errors, isValid },
    setFocus,
    ...rest
  } = useForm<RegisterQrCodeUrlSchema>({
    resolver: zodResolver(registerQrCodeUrlSchema),
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    defaultValues
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeUrlSchema> = (
    errors
  ) => {
    if (errors.url) {
      return setFocus('url')
    }
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    await trigger()
    const { error } = getFieldState('url')
    if (error) {
      setFocus('url')
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
