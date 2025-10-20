import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'

import { useEffect, useMemo } from 'react'

import { Language, QrCode } from '@/domains'
import { useQrCode } from '@/hooks'
import {
  createRegisterQrCodeUrlSchema,
  type RegisterQrCodeUrlSchema
} from './zod'

type Props = {
  language: Language
  qr: QrCode
}

export const useUrlQRCodeForm = ({ language, qr }: Props) => {
  const { ref, onConfirm, onDownload } = useQrCode(language)

  const schema = useMemo(
    () => createRegisterQrCodeUrlSchema(language),
    [language]
  )

  const defaultValues: RegisterQrCodeUrlSchema = useMemo(() => {
    return {
      url: qr.data.url!.value,
      language: language.value
    }
  }, [language.value, qr.data.url])

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
    resolver: zodResolver(schema),
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
