import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'


import { MutableRefObject, useEffect, useMemo, useRef } from 'react'

import { useQrCode } from '@/hooks'
import { registerQrCodeUrlSchema, RegisterQrCodeUrlSchema } from './zod'

type Props = {
  language?: string
}

export const useUrlQRCodeForm = ({ language = 'en' }: Props = {}) => {
  const { ref, onConfirm, onDownload } = useQrCode()

  const defaultValues: RegisterQrCodeUrlSchema = useMemo(() => {
    return {
      url: '',
      language
    }
  }, [language])

  const {
    handleSubmit,
    reset,
    control,
    watch,
    trigger,
    getFieldState,

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
