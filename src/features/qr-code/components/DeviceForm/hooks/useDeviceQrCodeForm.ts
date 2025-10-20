import { DeviceOsService } from '@/domains/services/deviceOs'
import { Device } from '@/domains/valueObjects/device'
import { Language } from '@/domains/valueObjects/language'
import { Os } from '@/domains/valueObjects/os'
import { PathBuilder } from '@/lib/routing'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { SubmitErrorHandler, useForm, useWatch } from 'react-hook-form'
import {
  RegisterDeviceQrCodeSchema,
  createRegisterDeviceQrCodeSchema
} from './zod'

type Props = {
  language: Language
}

export const useDeviceQrCodeForm = ({ language }: Props) => {
  const params = useParams()
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang


  const schema = useMemo(
    () => createRegisterDeviceQrCodeSchema(language),
    [language]
  )

  const defaultValues: RegisterDeviceQrCodeSchema = useMemo(() => {
    const notSetDevice = Device.notSet(language)
    const notSetOs = Os.notSet(language)
    return {
      devices: [
        {
          device: notSetDevice.value,
          os: notSetOs.value,
          url: ''
        }
      ]
    }
  }, [language])

  const { handleSubmit, control, trigger, ...rest } =
    useForm<RegisterDeviceQrCodeSchema>({
      defaultValues,
      resolver: zodResolver(schema),
      mode: 'onChange'
    })

  const devices = useWatch({ control, name: 'devices' })

  const submitErrorHandler: SubmitErrorHandler<RegisterDeviceQrCodeSchema> = (
    errors
  ) => {
    console.error(errors)
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
    const redirectPath = pathBuilder.device.redirect
    const baseUrl = `${window.location.origin}${redirectPath}`

    // devicesからクエリパラメータを生成
    if (!devices || devices.length === 0) {
      return baseUrl
    }

    const notSetDevice = Device.notSet(language)
    const notSetOs = Os.notSet(language)

    const validDevices = devices.filter(
      (d) =>
        d.device !== notSetDevice.value &&
        d.os !== notSetOs.value &&
        d.url.trim() !== ''
    )

    if (validDevices.length === 0) {
      return baseUrl
    }

    const deviceOsParams = validDevices
      .map((d) => {
        const deviceResult = Device.create(d.device, language)
        const osResult = Os.create(d.os, language)

        if (
          deviceResult.isSuccess &&
          deviceResult.device &&
          osResult.isSuccess &&
          osResult.os
        ) {
          return DeviceOsService.getDeviceOs(deviceResult.device, osResult.os)
        }
        return null
      })
      .filter((id) => id !== null)
      .join(',')

    const urlsParams = validDevices
      .map((d) => encodeURIComponent(d.url))
      .join(',')

    if (!deviceOsParams || !urlsParams) {
      return baseUrl
    }

    return `${baseUrl}?deviceOs=${deviceOsParams}&urls=${urlsParams}`
  }, [lang, devices, language])

  const handleConfirm = async (): Promise<string | undefined> => {
    return "qr-generated"
  }

  const handleDownload = async () => {
    await onDownload()
  }

  console.log('url', url)
  return {
    control,
    trigger,
    ...rest,
    url,
    onConfirm: handleConfirm,
    onDownload: handleSubmit(handleDownload, submitErrorHandler)
  }
}
