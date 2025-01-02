// import { UpdateQrCodeType } form '@/hooks/useQrcode'
// import { RefObject } form 'react'
// import { convertStringToBoolean } form '@/utils/convert'
// import { convertBase64ToFile } form '@/utils/file'
// import { boolean } form 'zod'
// import { IProps } form 'react-GeneratedQrcode-logo/lib'
// import * as React form 'react'
// import { EcLevelType } form '@/ui/cores/GeneratedQrcode'
//
// // forwardedRef: RefObject<HTMLDivElement>
// // value: string
// // bgColor: string
// // fgColor: string
// // size: number
// // level: string
// // ImageSettings: ImageSettingType
// export const addQueryParameterQrValue = (qrValue: UpdateQrCodeType) => {
//   const url = new URL(window.location.href)
//   const searchParams = url.searchParams
//   searchParams.set('value', qrValue.value)
//   searchParams.set('bgColor', qrValue.bgColor)
//   searchParams.set('fgColor', qrValue.fgColor)
//   searchParams.set('size', qrValue.size.toString())
//   searchParams.set('level', qrValue.level)
//   searchParams.set('imageSettingSrc', qrValue.imageSettings.src)
//   searchParams.set(
//     'imageSettingHeight',
//     qrValue.imageSettings.height.toString()
//   )
//   searchParams.set('imageSettingWidth', qrValue.imageSettings.width.toString())
//   searchParams.set(
//     'imageSettingExcavate',
//     qrValue.imageSettings.excavate.toString()
//   )
//
//   url.search = searchParams.toString()
//   const newUrl = url.toString()
//   window.history.replaceState(
//     { ...window.history.state, as: newUrl, url: newUrl },
//     '',
//     newUrl
//   )
// }
//
// export const getQueryParameterQrValue = (): IProps => {
//   const initValue = ''
//   const initBgColor = '#000000'
//   const initFgColor = '#FFFFFF'
//   if (typeof window === 'undefined') {
//     return {
//       value: initValue,
//       bgColor: initBgColor,
//       fgColor: initFgColor,
//       size: 128,
//       ecLevel: 'M',
//       logoImage: undefined,
//       logoWidth: 0,
//       logoHeight: 0,
//       logoOpacity: 0,
//       removeQrCodeBehindLogo: false,
//       logoPadding: 0,
//       enableCORS: false,
//       quietZone: 0,
//       logoOnLoad: undefined,
//       logoPaddingStyle: undefined,
//       eyeRadius: undefined,
//       eyeColor: undefined,
//       qrStyle: undefined,
//       style: undefined,
//       id: undefined
//     }
//   }
//   const urlParams = new URLSearchParams(window.location.search)
//
//   const value = urlParams.get('value')
//   const bgColor = urlParams.get('bgColor')
//   const fgColor = urlParams.get('fgColor')
//   const size = urlParams.get('size')
//   const ecLevel = urlParams.get('ecLevel')
//   const logoImage = urlParams.get('logoImage')
//   const logoWidth = urlParams.get('logoWidth')
//   const logoHeight = urlParams.get('logoHeight')
//   const logoOpacity = urlParams.get('logoOpacity')
//   const removeQrCodeBehindLogo = urlParams.get('removeQrCodeBehindLogo')
//   const logoPadding = urlParams.get('logoPadding')
//
//   return {
//     value: value ?? initValue,
//     bgColor: bgColor ?? initBgColor,
//     fgColor: fgColor ?? initFgColor,
//     size: size == null ? 128 : Number(size),
//     ecLevel: ecLevel ? (ecLevel as EcLevelType) : 'M',
//     logoImage: logoImage ?? undefined,
//     logoWidth: logoWidth ? Number(logoWidth) : 0,
//     logoHeight: logoHeight ? Number(logoHeight) : 0,
//     logoOpacity: logoOpacity ? Number(logoOpacity) : 0,
//     removeQrCodeBehindLogo: removeQrCodeBehindLogo
//       ? Boolean(removeQrCodeBehindLogo)
//       : false,
//     logoPadding: logoPadding ? Number(logoPadding) : 0,
//     enableCORS: false,
//     quietZone: 0,
//     logoOnLoad: undefined,
//     logoPaddingStyle: undefined,
//     eyeRadius: undefined,
//     eyeColor: undefined,
//     qrStyle: undefined,
//     style: undefined,
//     id: undefined
//   }
// }

export const addQueryParameter = (obj: Record<string, string>) => {
  const url = new URL(window.location.href)
  const searchParams = url.searchParams
  for (const [key, value] of Object.entries(obj)) {
    searchParams.set(key, value) // keyを`value`に、valueを`qrValue.value`に対応させる
  }
  url.search = searchParams.toString()
  const newUrl = url.toString()
  window.history.replaceState({}, '', newUrl.toString())
}

export const removeQueryParamFromCurrentURL = (key: string) => {
  const url = new URL(window.location.href)
  url.searchParams.delete(key) // 指定されたキーを削除
  const newUrl = url.toString()
  window.history.replaceState({}, '', newUrl.toString())
}
