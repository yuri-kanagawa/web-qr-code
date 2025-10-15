import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm, useWatch } from 'react-hook-form'
import { createRegisterQrCodeWiFiSchema, type RegisterQrCodeWiFiSchema } from './zod'
import { useQrCode } from '@/hooks'
import { useEffect, useMemo } from 'react'
import { Language } from '@/domains'

interface Props {
  ssid: string
  password: string
  type: string
  language: Language
}

export const useWiFiQrCodeForm = ({
  ssid,
  password,
  type,
  language
}: Props) => {
  const { ref, onConfirm, onDownload } = useQrCode(language)

  const defaultValues: RegisterQrCodeWiFiSchema = useMemo(() => {
    return {
      ssid,
      password,
      type
    }
  }, [ssid, password, type])

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
    return await onConfirm()
  }

  return {
    ref,
    control,
    onConfirm: handleConfirm,
    onDownload: handleSubmit(onDownload, submitErrorHandler),

    ...rest
  }
}
