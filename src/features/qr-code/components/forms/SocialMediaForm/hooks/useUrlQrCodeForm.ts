import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useEffect, useMemo } from 'react'

import { Language, QrCode } from '@/domains'
import {
  createRegisterQrCodeUrlSchema,
  type RegisterQrCodeUrlSchema
} from './zod'

type Props = {
  language: Language
  qr: QrCode
}

export const useUrlQRCodeForm = ({ language, qr }: Props) => {
  const schema = useMemo(
    () => createRegisterQrCodeUrlSchema(language),
    [language]
  )

  const defaultValues: RegisterQrCodeUrlSchema = useMemo(() => {
    return {
      url: qr.url.value,
      language: language.value
    }
  }, [language.value, qr.url.value])

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

  return {
    control,
    ...rest
  }
}
