import { QrCode } from '@/domains'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {
  createRegisterQrCodePhoneSchema,
  RegisterQrCodePhoneSchema
} from './zod'

type Props = {
  qr: QrCode
}

export const usePhoneQrCodeForm = ({ qr }: Props) => {
  const defaultValues: RegisterQrCodePhoneSchema = useMemo(() => {
    return {
      phoneNumber: qr.phoneNumber.value
    }
  }, [qr.phoneNumber])

  const { reset, control, watch, ...rest } = useForm<RegisterQrCodePhoneSchema>(
    {
      defaultValues,
      mode: 'onChange',
      resolver: zodResolver(createRegisterQrCodePhoneSchema(qr.language))
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
