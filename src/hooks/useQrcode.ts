import { DeviceOsService } from '@/domains/services/deviceOs'
import { Device } from '@/domains/valueObjects/device'
import { Os } from '@/domains/valueObjects/os'
import { SearchParamsManager } from '@/lib/browser'
import { useSearchParams } from 'next/navigation'
import { MutableRefObject, useCallback, useMemo, useRef } from 'react'

import { useNotify } from '@/hooks/useNotify'
import { QrScannerRepository } from '@/infrastructure/repositories'

export function useQrCode() {
  const searchParams = useSearchParams()

  const getSize = (value: string | null): number => {
    if (value == null) {
      return 150
    }
    return Number(value)
  }

  const getEcLevel = (value: string | null): 'L' | 'M' | 'Q' | 'H' => {
    if (!value) return 'M'
    switch (value) {
      case 'L':
      case 'M':
      case 'Q':
      case 'H':
        return value
      default:
        return 'M'
    }
  }
  const getLogoPaddingStyle = (value: string | null) => {
    if (!value) return 'square'
    switch (value) {
      case 'square':
      case 'circle':
        return value
      default:
        return 'square'
    }
  }

  const getQrStyle = (value: string | null) => {
    if (!value) return undefined
    switch (value) {
      case 'squares':
      case 'dots':
      case 'fluid':
        return value
      default:
        return undefined
    }
  }
  const ecLevel = getEcLevel(searchParams.get('ecLevel'))
  const enableCORS = searchParams.get('enableCORS')
    ? Boolean(searchParams.get('enableCORS'))
    : undefined
  const size = getSize(searchParams.get('size'))
  const logoImage = searchParams.get('logoImage') ?? undefined
  const bgColor = searchParams.get('bgColor') ?? '#000000'
  const fgColor = searchParams.get('fgColor') ?? '#ffffff'
  const logoWidth = Number(searchParams.get('logoWidth')) ?? undefined
  const logoHeight = Number(searchParams.get('logoHeight')) ?? undefined
  const logoOpacity = Number(searchParams.get('logoOpacity')) ?? undefined
  const removeQrCodeBehindLogo =
    Boolean(searchParams.get('removeQrCodeBehindLogo')) ?? undefined
  const logoPadding = Number(searchParams.get('logoPadding')) ?? undefined
  const logoPaddingStyle = getLogoPaddingStyle(
    searchParams.get('logoPaddingStyle')
  )
  const QrStyle = getQrStyle(searchParams.get('qrStyle'))

  const setEcLevel = (value: string) => {
    const inputValue = getEcLevel(value)
    if (!inputValue) return
    SearchParamsManager.add({ ecLevel: inputValue })
  }
  const setEnableCORS = (value: boolean) => {
    SearchParamsManager.add({ enableCORS: value })
  }

  const setSize = (value: number) => {
    SearchParamsManager.add({ size: value })
  }

  const setQuietZone = (value: number) => {
    SearchParamsManager.add({ quietZone: value })
  }
  const setBgColor = (value: string) => {
    SearchParamsManager.add({ bgColor: value })
  }
  const setFgColor = (value: string) => {
    SearchParamsManager.add({ fgColor: value })
  }

  const setLogoWidth = (value: number) => {
    SearchParamsManager.add({ logoWidth: value })
  }
  const setLogoHeight = (value: number) => {
    SearchParamsManager.add({ logoHeight: value })
  }
  const setLogoOpacity = (value: number) => {
    SearchParamsManager.add({ logoOpacity: value })
  }

  const setRemoveQrCodeBehindLogo = (value: boolean) => {
    SearchParamsManager.add({ removeQrCodeBehindLogo: value })
  }

  const setLogoPadding = (value: number) => {
    SearchParamsManager.add({ logoPadding: value })
  }

  const setLogoPaddingStyle = (value: string) => {
    SearchParamsManager.add({ logoPaddingStyle: value })
  }
  const setQrValue = (value: string) => {
    SearchParamsManager.add({ qrValue: value })
  }
  const setLogoImage = (value: string) => {
    SearchParamsManager.add({ logoImage: value })
  }
  const eyeColor1 = searchParams.get('eyeColor1') ?? fgColor
  const eyeColor2 = searchParams.get('eyeColor2') ?? fgColor
  const eyeColor3 = searchParams.get('eyeColor3') ?? fgColor
  const setEyeColor1 = (value: string) =>
    SearchParamsManager.add({ eyeColor1: value })

  const setEyeColor2 = (value: string) =>
    SearchParamsManager.add({ eyeColor2: value })
  const setEyeColor3 = (value: string) =>
    SearchParamsManager.add({ eyeColor3: value })
  const eyeRadius1 = Number(searchParams.get('eyeRadius1')) ?? 0
  const eyeRadius2 = Number(searchParams.get('eyeRadius2')) ?? 0
  const eyeRadius3 = Number(searchParams.get('eyeRadius3')) ?? 0
  const setEyeRadius1 = (value: number) =>
    SearchParamsManager.add({ eyeColor1: value })

  const setEyeRadius2 = (value: number) =>
    SearchParamsManager.add({ eyeColor2: value })
  const setEyeRadius3 = (value: number) =>
    SearchParamsManager.add({ eyeColor3: value })
  const deviceOs = searchParams.get('deviceOs')?.split(',').map(Number) ?? []
  const setDeviceOs = (value: string[]) => {
    SearchParamsManager.add({ deviceOs: value })
  }

  const urls = searchParams.get('urls')?.split(',') ?? []
  const setUrls = (value: string[]) => {
    SearchParamsManager.add({ urls: value })
  }
  const labels = searchParams.get('labels')?.split(',') ?? []

  const socialMedia =
    searchParams.get('socialMedia')?.split(',').map(Number) ?? []
  const setSocialMedia = (value: number[]) => {
    SearchParamsManager.add({ socialMedia: value })
  }

  const deviceOsIndex = useMemo(() => {
    const os = Os.detect()
    const device = Device.detect()
    const deviceOsValue = DeviceOsService.getDeviceOs(device, os)
    return deviceOs.indexOf(deviceOsValue)
  }, [])

  const text = searchParams.get('text') ?? ''
  const setText = (value: string) => SearchParamsManager.add({ text: value })

  const firstName = searchParams.get('firstName') ?? ''
  const setFirstName = (value: string) =>
    SearchParamsManager.add({ firstName: value })
  const lastName = searchParams.get('lastName') ?? ''
  const setLastName = (value: string) =>
    SearchParamsManager.add({ lastName: value })
  const middleName = searchParams.get('middleName') ?? ''
  const setMiddleName = (value: string) =>
    SearchParamsManager.add({ middleName: value })
  const email = searchParams.get('email') ?? ''
  const setEmail = (value: string) => SearchParamsManager.add({ email: value })

  const phoneNumber = searchParams.get('phoneNumber') ?? ''
  const resetPhoneNumber = () => SearchParamsManager.remove(['phoneNumber'])
  const body = searchParams.get('body') ?? ''
  const resetBody = () => SearchParamsManager.remove(['body'])
  const cellPhone = searchParams.get('cellPhone') ?? ''
  const setCellPhone = (value: string) =>
    SearchParamsManager.add({ cellPhone: value })
  const fax = searchParams.get('fax') ?? ''
  const setFax = (value: string) => SearchParamsManager.add({ fax: value })
  const homePhone = searchParams.get('homePhone') ?? ''
  const setHomePhone = (value: string) =>
    SearchParamsManager.add({ homePhone: value })
  const workPhone = searchParams.get('workPhone') ?? ''
  const setWorkPhone = (value: string) =>
    SearchParamsManager.add({ workPhone: value })
  const ref = useRef<HTMLDivElement | null>(null)
  const qrScannerRepository = useMemo(() => new QrScannerRepository(), [])
  const { successNotify, errorNotify, warningNotify } = useNotify()
  const getCanvasFromRef = (): HTMLCanvasElement | null => {
    const mutableRef = ref as MutableRefObject<HTMLDivElement | null>
    const children = mutableRef.current?.children
    if (!children || children.length === 0) return null

    const canvas = children[0] as HTMLCanvasElement | null
    return canvas instanceof HTMLCanvasElement ? canvas : null
  }
  const isUsableQRCode = async (url: string) => {
    try {
      return await qrScannerRepository.scanFromImageUrl(url)
    } catch (e) {
      warningNotify('QRコードを読み取れませんでした')
    }
  }

  const onConfirm = useCallback(async (): Promise<string | undefined> => {
    try {
      const canvas = getCanvasFromRef()
      if (!canvas) return

      const pngDataUrl = canvas.toDataURL('image/png')
      const result = await isUsableQRCode(pngDataUrl)
      console.log('fadsfa', result)
      if (!result) return
      return result.data
      // const qrData = result.data
      // successNotify('QRコードの読み取りに成功')
      // return qrData
    } catch (e) {
      warningNotify('QRコードを読み取れませんでした')
    }
  }, [ref])

  const onDownload = useCallback(async () => {
    try {
      const canvas = getCanvasFromRef()
      if (!canvas) {
        return
      }
      const pngDataUrl = canvas.toDataURL('image/png')
      const result = await isUsableQRCode(pngDataUrl)
      if (result == null) return
      const downloadLink = document.createElement('a')
      downloadLink.href = pngDataUrl
      downloadLink.download = 'qr.png'
      downloadLink.click()

      successNotify('Qrコードのダウンロード成功')
    } catch (e) {
      errorNotify('QRコードのダウンロードに失敗')
    }
  }, [ref])

  return {
    ecLevel,
    logoImage,
    enableCORS,
    size,
    phoneNumber,
    resetPhoneNumber,
    bgColor,
    fgColor,
    logoWidth,
    logoHeight,
    logoOpacity,
    removeQrCodeBehindLogo,
    logoPadding,
    logoPaddingStyle,
    QrStyle,
    setEcLevel,
    setEnableCORS,
    setSize,
    setQuietZone,
    setBgColor,
    setFgColor,
    setLogoWidth,
    setLogoHeight,
    setLogoOpacity,
    setRemoveQrCodeBehindLogo,
    setLogoPadding,
    setLogoPaddingStyle,
    setQrValue,
    setLogoImage,
    eyeColor1,
    setEyeColor1,
    eyeColor2,
    setEyeColor2,
    eyeColor3,
    setEyeColor3,
    eyeRadius1,
    eyeRadius2,
    eyeRadius3,
    setEyeRadius1,
    setEyeRadius2,
    setEyeRadius3,
    deviceOs,
    setDeviceOs,
    urls,
    setUrls,
    deviceOsIndex,
    text,
    setText,
    labels,
    socialMedia,
    setSocialMedia,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    middleName,
    setMiddleName,
    email,
    setEmail,
    cellPhone,
    setCellPhone,
    fax,
    setFax,
    homePhone,
    setHomePhone,
    workPhone,
    setWorkPhone,
    ref,
    onConfirm,
    onDownload,
    body,
    resetBody
  }
}
