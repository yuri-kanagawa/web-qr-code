import { Language, QrCode } from '@/domains'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { registerQrCodePhoneSchema, RegisterQrCodePhoneSchema } from './zod'

type Props = {
  language: Language
  qr: QrCode
}

export const usePhoneQrCodeForm = ({ language, qr }: Props) => {
  const defaultValues: RegisterQrCodePhoneSchema = useMemo(() => {
    return {
      phoneNumber: qr.phoneNumber.value
    }
  }, [qr.phoneNumber])

  const { reset, control, watch, ...rest } = useForm<RegisterQrCodePhoneSchema>(
    {
      defaultValues,
      mode: 'onChange',
      resolver: zodResolver(registerQrCodePhoneSchema)
    }
  )

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return {
    control,
    watch,
    ...rest
  }
}
