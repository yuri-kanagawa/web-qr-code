import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { RegisterDeviceQrCodeSchema, registerDeviceQrCodeSchema } from "./zod"
import { useQrCode } from "@/hooks/useQrCode"
import { useParams } from 'next/navigation'
import { path } from '@/config/path'
import { useMemo } from 'react'

export const useDeviceQrCodeForm = () => {
  const { ref, onConfirm, onDownload } = useQrCode()
  const params = useParams()
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang

  const defaultValues: RegisterDeviceQrCodeSchema = {
    devices: []
  }

  const {
    handleSubmit,
    ...rest
  } = useForm<RegisterDeviceQrCodeSchema>({
    defaultValues,
    resolver: zodResolver(registerDeviceQrCodeSchema)
  })

  const submitErrorHandler: SubmitErrorHandler<RegisterDeviceQrCodeSchema> = (
    errors
  ) => {
    console.error(errors)
  }

  const handleConfirm = async (): Promise<string | undefined> => {
    return await onConfirm()
  }
  const url = useMemo(() => {
    if (typeof window === 'undefined') {
      return ''
    }
    const redirectPath = path.device.redirect({ lang: 'en' })
    return `${window.location.origin}${redirectPath}`
  }, [lang])
  console.log('url', url)
  return {
    ref,
    ...rest,
    url,
    onConfirm: handleConfirm,
    onDownload: handleSubmit(onDownload, submitErrorHandler)
  }
}