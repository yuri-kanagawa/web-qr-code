import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks/useQrCode'
import { PathBuilder } from '@/lib/routing'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { RegisterDeviceQrCodeSchema, registerDeviceQrCodeSchema } from './zod'

export const useDeviceQrCodeForm = () => {
  const params = useParams()
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang
  const languageResult = Language.create(lang || 'en')
  const language = languageResult.isSuccess
    ? languageResult.language!
    : Language.default()
  
  const { ref, onConfirm, onDownload } = useQrCode(language)

  const defaultValues: RegisterDeviceQrCodeSchema = {
    devices: []
  }

  const { handleSubmit, ...rest } = useForm<RegisterDeviceQrCodeSchema>({
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
    const languageResult = Language.create(lang || 'en')
    const language =
      languageResult.isSuccess && languageResult.language
        ? languageResult.language
        : Language.default()

    const pathBuilder = new PathBuilder(language)
    const redirectPath = pathBuilder.device.redirect()
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
