import { MutableRefObject, useCallback, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { addQueryParameter } from '@/utils/queryParameter'
import { detectDevice } from '@/domain/device'
import { getDeviceOs } from '@/domain/deviceOs'
import { detectOS } from '@/domain/os'
import {
  CellPhoneTextFieldProps,
  FaxTextFieldProps,
  WorkPhoneTextFieldProps
} from '@/ui/cores/textField/PhoneTextField/Device'
import { extractPngDataUrl, isUrl } from '@/utils/qr'
import { useQrScanner } from '@/hooks/useQrScanner'
import { useNotify } from '@/hooks/useNotify'

export const useQrcode = () => {
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
  const bgColor = searchParams.get('bgColor') ?? 'black'
  const fgColor = searchParams.get('fgColor') ?? 'white'
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
    addQueryParameter({ ecLevel: inputValue })
  }
  const setEnableCORS = (value: boolean) => {
    addQueryParameter({ enableCORS: String(value) })
  }

  const setSize = (value: number) => {
    addQueryParameter({ size: String(value) })
  }

  const setQuietZone = (value: number) => {
    addQueryParameter({ quietZone: String(value) })
  }
  const setBgColor = (value: string) => {
    addQueryParameter({ bgColor: value })
  }
  const setFgColor = (value: string) => {
    addQueryParameter({ fgColor: value })
  }

  const setLogoWidth = (value: number) => {
    addQueryParameter({ logoWidth: String(value) })
  }
  const setLogoHeight = (value: number) => {
    addQueryParameter({ logoHeight: String(value) })
  }
  const setLogoOpacity = (value: number) => {
    addQueryParameter({ logoOpacity: String(value) })
  }

  const setRemoveQrCodeBehindLogo = (value: boolean) => {
    addQueryParameter({ removeQrCodeBehindLogo: String(value) })
  }

  const setLogoPadding = (value: number) => {
    addQueryParameter({ logoPadding: String(value) })
  }

  const setLogoPaddingStyle = (value: string) => {
    addQueryParameter({ logoPaddingStyle: value })
  }
  const setQrValue = (value: string) => {
    addQueryParameter({ qrValue: value })
  }
  const setLogoImage = (value: string) => {
    addQueryParameter({ logoImage: value })
  }
  const eyeColor1 = searchParams.get('eyeColor1') ?? ''
  const eyeColor2 = searchParams.get('eyeColor2') ?? ''
  const eyeColor3 = searchParams.get('eyeColor3') ?? ''
  const setEyeColor1 = (value: string) =>
    addQueryParameter({ eyeColor1: String(value) })

  const setEyeColor2 = (value: string) =>
    addQueryParameter({ eyeColor2: String(value) })
  const setEyeColor3 = (value: string) =>
    addQueryParameter({ eyeColor3: String(value) })
  const eyeRadius1 = Number(searchParams.get('eyeRadius1')) ?? 0
  const eyeRadius2 = Number(searchParams.get('eyeRadius2')) ?? 0
  const eyeRadius3 = Number(searchParams.get('eyeRadius3')) ?? 0
  const setEyeRadius1 = (value: number) =>
    addQueryParameter({ eyeColor1: value })

  const setEyeRadius2 = (value: number) =>
    addQueryParameter({ eyeColor2: value })
  const setEyeRadius3 = (value: number) =>
    addQueryParameter({ eyeColor3: value })
  const deviceOs = searchParams.get('deviceOs')?.split(',').map(Number) ?? []
  const setDeviceOs = (value: string[]) => {
    addQueryParameter({ deviceOs: value })
  }

  const urls = searchParams.get('urls')?.split(',') ?? []
  const setUrls = (value: string[]) => {
    addQueryParameter({ urls: value })
  }

  const socialMedia =
    searchParams.get('socialMedia')?.split(',').map(Number) ?? []
  const setSocialMedia = (value: number[]) => {
    addQueryParameter({ socialMedia: value })
  }

  const deviceOsIndex = useMemo(() => {
    const os = detectOS()
    const device = detectDevice()
    const value = getDeviceOs({
      device,
      os
    })
    return deviceOs.indexOf(value.deviceOs)
  }, [])

  const text = searchParams.get('text') ?? ''
  const setText = (value: string) => addQueryParameter({ text: value })
  const [file, setFile] = useState<File | null>(null)
  const url = searchParams.get('url') ?? ''
  const setUrl = (value: string) => addQueryParameter({ url: value })
  const firstName = searchParams.get('firstName') ?? ''
  const setFirstName = (value: string) =>
    addQueryParameter({ firstName: value })
  const lastName = searchParams.get('lastName') ?? ''
  const setLastName = (value: string) => addQueryParameter({ lastName: value })
  const middleName = searchParams.get('middleName') ?? ''
  const setMiddleName = (value: string) =>
    addQueryParameter({ middleName: value })
  const email = searchParams.get('email') ?? ''
  const setEmail = (value: string) => addQueryParameter({ email: value })

  const cellPhone = searchParams.get('cellPhone') ?? ''
  const setCellPhone = (value: string) =>
    addQueryParameter({ cellPhone: value })
  const fax = searchParams.get('fax') ?? ''
  const setFax = (value: string) => addQueryParameter({ fax: value })
  const homePhone = searchParams.get('homePhone') ?? ''
  const setHomePhone = (value: string) =>
    addQueryParameter({ homePhone: value })
  const workPhone = searchParams.get('workPhone') ?? ''
  const setWorkPhone = (value: string) =>
    addQueryParameter({ workPhone: value })
  const ref = useRef<HTMLDivElement | null>(null)
  const { trigger } = useQrScanner()
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
      return await trigger(url)
    } catch (e) {
      warningNotify('QRコードを読み取れませんでした')
    }
  }

  const onConfirm = useCallback(async () => {
    try {
      const canvas = getCanvasFromRef()
      if (!canvas) return

      const pngDataUrl = canvas.toDataURL('image/png')
      if (!pngDataUrl) return
      const result = await isUsableQRCode(pngDataUrl)
      if (result == null) return
      const qrData = result.data
      successNotify('QRコードの読み取りに成功')
      if (isUrl(qrData)) {
        return window.open(qrData)
      } else if (qrData.startsWith('Sms:')) {
        return (window.location.href = qrData)
      }

      successNotify('QRコードの読み取りに成功')
    } catch (e) {
      // warningNotify('QRコードを読み取れませんでした')
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
    file,
    setFile,
    url,
    setUrl,
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
    onDownload
  }
}
