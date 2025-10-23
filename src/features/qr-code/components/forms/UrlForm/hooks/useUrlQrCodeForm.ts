import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'

import { useEffect, useMemo } from 'react'

import { QrCode } from '@/domains'
import {
  createRegisterQrCodeUrlSchema,
  type RegisterQrCodeUrlSchema
} from './zod'

type Props = {
  qr: QrCode
}

export const useUrlQRCodeForm = ({ qr }: Props) => {
  const schema = useMemo(
    () => createRegisterQrCodeUrlSchema(qr.language),
    [qr.language]
  )

  const defaultValues: RegisterQrCodeUrlSchema = useMemo(() => {
    return {
      url: qr.url.value,
      language: language.value
    }
  }, [language.value, qr.url])

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

  return {
    control,
    watch,
    ...rest
  }
}
