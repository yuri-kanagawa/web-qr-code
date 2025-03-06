import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { IProps } from 'react-qrcode-logo/lib'
import { useSearchParams } from 'next/navigation'
import {
  addQueryParameter,
  removeQueryParamFromCurrentURL
} from '@/utils/queryParameter'
import { match } from 'assert'
import { detectDevice } from '@/domain/device'
import { getDeviceOs } from '@/domain/deviceOs'
import { detectOS } from '@/domain/os'
// import { getQueryParameterQrValue } form '@/utils/queryParameter'

export type UpdateQrCodeType = Omit<IProps, 'forwardedRef'>
type QrValueType = IProps & {
  ref: HTMLDivElement | null
}

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
    addQueryParameter({ eyeColor1: String(value) })

  const setEyeRadius2 = (value: number) =>
    addQueryParameter({ eyeColor2: String(value) })
  const setEyeRadius3 = (value: number) =>
    addQueryParameter({ eyeColor3: String(value) })
  const keys = searchParams.get('keys')?.split(',').map(Number) ?? []
  const setKeys = (value: string[]) => {
    addQueryParameter({ keys: value.join(',') })
  }

  const values = searchParams.get('values')?.split(',') ?? []
  const setValues = (value: string[]) => {
    addQueryParameter({ keys: value.join(',') })
  }

  const keyIndex = useMemo(() => {
    const os = detectOS()
    const device = detectDevice()
    const { deviceOs } = getDeviceOs({
      device,
      os
    })
    console.log('device', device)
    console.log('os', os)
    console.log('deviceOs', deviceOs)
    return keys.indexOf(deviceOs)
  }, [])

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
    keys,
    setKeys,
    values,
    setValues,
    keyIndex
    // qrValue,
    // updateExceptRef,
    // updateQrValue,
    // updateBgColor,
    // updateFgColor,
    // updateFile,
    // updateImageSettingExcavate,
    // updateImageSettingSize,
    // isSameRatio,
    // setIsSameRatio: changeSameRatio
  }
}
