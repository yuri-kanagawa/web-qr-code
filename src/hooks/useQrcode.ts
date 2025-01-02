import { useCallback, useEffect, useRef, useState } from 'react'
import { IProps } from 'react-qrcode-logo/lib'
import { useSearchParams } from 'next/navigation'
import {
  addQueryParameter,
  removeQueryParamFromCurrentURL
} from '@/utils/queryParameter'
import { match } from 'assert'
// import { getQueryParameterQrValue } form '@/utils/queryParameter'

export type UpdateQrCodeType = Omit<IProps, 'forwardedRef'>
type QrValueType = IProps & {
  ref: HTMLDivElement | null
}

export const useQrcode = () => {
  // const [qrValue, setQrValue] = useState<IProps>({
  //   // ...getQueryParameterQrValue()
  // })

  // const updateExceptRef = (value: UpdateQrCodeType) => {
  //   setQrValue((prevState) => ({
  //     ...prevState,
  //     ...value
  //   }))
  // }
  // const updateQrValue = useCallback((value: string) => {
  //   setQrValue((prevState) => ({
  //     ...prevState,
  //     value: value
  //   }))
  // }, [])
  //
  // const updateBgColor = useCallback((bgColor: string) => {
  //   setQrValue((prevState) => ({
  //     ...prevState,
  //     bgColor: bgColor
  //   }))
  // }, [])
  //
  // const updateFgColor = useCallback((fgColor: string) => {
  //   setQrValue((prevState) => ({
  //     ...prevState,
  //     fgColor: fgColor
  //   }))
  // }, [])
  //
  // const updateFile = (base64: string) => {
  //   // const fileURL = URL.createObjectURL(file)
  //   setQrValue((prevState) => ({
  //     ...prevState,
  //     logoImage: base64
  //     // imageSettings: {
  //     //   src: fileURL,
  //     //   width: 50,
  //     //   height: 50,
  //     //   excavate: prevState.imageSettings
  //     //     ? prevState.imageSettings.excavate
  //     //     : false
  //     // }
  //   }))
  // }
  //
  // const updateImageSettingExcavate = () => {
  //   // setQrValue((prevState) => ({
  //   //   ...prevState,
  //   //   imageSettings: {
  //   //     src: prevState.imageSettings.src,
  //   //     width: prevState.imageSettings.width,
  //   //     height: prevState.imageSettings.height,
  //   //     excavate: !prevState.imageSettings.excavate
  //   //   }
  //   // }))
  // }
  // const [isSameRatio, setIsSameRatio] = useState(false)
  // const updateImageSettingSize = (width: number, height: number) => {
  //   if (isSameRatio) {
  //     setQrValue((prevState) => ({
  //       ...prevState,
  //       logoWidth: prevState.logoWidth === width ? height : width,
  //       logoHeight: prevState.logoHeight === height ? width : height
  //       // imageSettings: {
  //       //   src: prevState.imageSettings.src,
  //       //   width: prevState.imageSettings.width === width ? height : width,
  //       //   height: prevState.imageSettings.height === height ? width : height,
  //       //   excavate: !prevState.imageSettings.excavate
  //       // }
  //     }))
  //   } else {
  //     setQrValue((prevState) => ({
  //       ...prevState,
  //       logoHeight: height,
  //       logoWidth: width
  //     }))
  //   }
  // }
  //
  // const changeSameRatio = () => setIsSameRatio(!isSameRatio)
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
  const bgColor = searchParams.get('bgColor') ?? ''
  const fgColor = searchParams.get('fgColor') ?? ''
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
    setLogoImage
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
