import { QrCode } from '@/domains/entities/qr/entity'
import { Device } from '@/domains/valueObjects/device'
import { Os } from '@/domains/valueObjects/os'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {
  RegisterDeviceQrCodeSchema,
  createRegisterDeviceQrCodeSchema
} from './zod'

type Props = {
  qr: QrCode
}

export const useDeviceQrCodeForm = ({ qr }: Props) => {
  const schema = useMemo(
    () => createRegisterDeviceQrCodeSchema(qr.language),
    [qr.language]
  )

  const defaultValues: RegisterDeviceQrCodeSchema = useMemo(() => {
    if (qr.deviceData) {
      return qr.deviceData.value
    }

    const notSetDevice = Device.notSet(qr.language)
    const notSetOs = Os.notSet(qr.language)
    return {
      devices: [
        {
          device: notSetDevice.value,
          os: notSetOs.value,
          url: ''
        }
      ]
    }
  }, [qr.language, qr.deviceData])

  const { control, trigger, ...rest } = useForm<RegisterDeviceQrCodeSchema>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  return {
    control,
    trigger,
    ...rest
  }
}
