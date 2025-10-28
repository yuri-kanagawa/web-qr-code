import { QrCode } from '@/domains'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import {
  createRegisterQrCodeWiFiSchema,
  type RegisterQrCodeWiFiSchema
} from './zod'

interface Props {
  qr: QrCode
}

export const useWiFiQrCodeForm = ({ qr }: Props) => {
  const defaultValues: RegisterQrCodeWiFiSchema = useMemo(() => {
    return {
      ssid: qr.wifiSsid.value,
      password: qr.wifiPassword.value,
      type: qr.wifiType.value?.toString() || ''
    }
  }, [qr.wifiSsid, qr.wifiPassword, qr.wifiType])

  const schema = useMemo(
    () => createRegisterQrCodeWiFiSchema(qr.language),
    [qr.language]
  )

  const {
    handleSubmit,
    trigger,
    setFocus,
    getFieldState,
    control,
    reset,
    ...rest
  } = useForm<RegisterQrCodeWiFiSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const submitErrorHandler: SubmitErrorHandler<RegisterQrCodeWiFiSchema> = (
    errors
  ) => {
    console.error(errors)
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    await trigger()
    return 'wifi-qr-generated'
  }

  const handleDownload = () => {
    // ダウンロード機能は一時的に無効化
    console.log('Download functionality temporarily disabled')
  }

  return {
    control,
    onConfirm: handleConfirm,
    onDownload: handleDownload,
    ...rest
  }
}
