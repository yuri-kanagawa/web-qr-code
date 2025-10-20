import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm, useWatch } from 'react-hook-form'
import { createRegisterQrCodeWiFiSchema, type RegisterQrCodeWiFiSchema } from './zod'
import { useEffect, useMemo } from 'react'
import { Language, QrCode } from '@/domains'

interface Props {
  language: Language
  qr: QrCode
}

export const useWiFiQrCodeForm = ({
  language,
  qr
}: Props) => {

  const defaultValues: RegisterQrCodeWiFiSchema = useMemo(() => {
    return {
      ssid: qr.wifiSsid?.value || '',
      password: qr.wifiPassword?.value || '',
      type: qr.wifiType?.value?.toString() || ''
    }
  }, [qr.wifiSsid, qr.wifiPassword, qr.wifiType])

  const schema = useMemo(() => createRegisterQrCodeWiFiSchema(language), [language])

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
