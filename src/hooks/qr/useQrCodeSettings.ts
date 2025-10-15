import { QrCodeSettings } from '@/domains/entities'
import { Language } from '@/domains/valueObjects/language'
import {
  EcLevel,
  QrColor,
  QrSize,
  QrStyle
} from '@/domains/valueObjects/qrSettings'
import { SearchParamsManager } from '@/lib/browser'
import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

/**
 * QRコード設定を管理するフック
 * SearchParamsとQrCodeSettings Entityを連携
 */
export const useQrCodeSettings = (language: Language = Language.default()) => {
  const searchParams = useSearchParams()

  // SearchParamsからEntityを構築
  const settings = useMemo(
    () => QrCodeSettings.fromSearchParams(searchParams, language),
    [searchParams, language]
  )

  // 個別の設定更新メソッド
  const updateEcLevel = useCallback((ecLevel: EcLevel) => {
    SearchParamsManager.add({ ecLevel: ecLevel.value })
  }, [])

  const updateSize = useCallback(
    (value: number) => {
      const result = QrSize.create(value, language)
      if (result.isSuccess && result.qrSize) {
        SearchParamsManager.add({ size: result.qrSize.value })
      }
    },
    [language]
  )

  const updateFgColor = useCallback((qrColor: QrColor) => {
    SearchParamsManager.add({ fgColor: qrColor.value })
  }, [])

  const updateBgColor = useCallback((qrColor: QrColor) => {
    SearchParamsManager.add({ bgColor: qrColor.value })
  }, [])

  const updateEyeColor1 = useCallback((qrColor: QrColor) => {
    SearchParamsManager.add({ eyeColor1: qrColor.value })
  }, [])

  const updateEyeColor2 = useCallback((qrColor: QrColor) => {
    SearchParamsManager.add({ eyeColor2: qrColor.value })
  }, [])

  const updateEyeColor3 = useCallback((qrColor: QrColor) => {
    SearchParamsManager.add({ eyeColor3: qrColor.value })
  }, [])

  const updateLogoImage = useCallback((value: string) => {
    SearchParamsManager.add({ logoImage: value })
  }, [])

  const updateLogoWidth = useCallback((value: number) => {
    SearchParamsManager.add({ logoWidth: value })
  }, [])

  const updateLogoHeight = useCallback((value: number) => {
    SearchParamsManager.add({ logoHeight: value })
  }, [])

  const updateLogoOpacity = useCallback((value: number) => {
    SearchParamsManager.add({ logoOpacity: value })
  }, [])

  const updateRemoveQrCodeBehindLogo = useCallback((value: boolean) => {
    SearchParamsManager.add({ removeQrCodeBehindLogo: value })
  }, [])

  const updateLogoPadding = useCallback((value: number) => {
    SearchParamsManager.add({ logoPadding: value })
  }, [])

  const updateLogoPaddingStyle = useCallback((value: string) => {
    if (value === 'square' || value === 'circle') {
      SearchParamsManager.add({ logoPaddingStyle: value })
    }
  }, [])

  const updateEyeRadius1 = useCallback((value: number) => {
    SearchParamsManager.add({ eyeRadius1: value })
  }, [])

  const updateEyeRadius2 = useCallback((value: number) => {
    SearchParamsManager.add({ eyeRadius2: value })
  }, [])

  const updateEyeRadius3 = useCallback((value: number) => {
    SearchParamsManager.add({ eyeRadius3: value })
  }, [])

  const updateEnableCORS = useCallback((value: boolean) => {
    SearchParamsManager.add({ enableCORS: value })
  }, [])

  const updateQuietZone = useCallback((value: number) => {
    SearchParamsManager.add({ quietZone: value })
  }, [])

  const updateQrStyle = useCallback((qrStyle: QrStyle) => {
    if (qrStyle.value) {
      SearchParamsManager.add({ qrStyle: qrStyle.value })
    } else {
      SearchParamsManager.remove(['qrStyle'])
    }
  }, [])

  // maxSize管理
  const maxSize = useMemo(() => {
    try {
      const param = searchParams.get('maxSize')
      return param ? Number(param) : null
    } catch {
      return null
    }
  }, [searchParams])

  const updateMaxSize = useCallback((value: number) => {
    try {
      SearchParamsManager.add({ maxSize: value })
    } catch (error) {
      console.error('Failed to update maxSize:', error)
    }
  }, [])

  return {
    settings,
    maxSize,
    // Setters
    updateEcLevel,
    updateSize,
    updateMaxSize,
    updateFgColor,
    updateBgColor,
    updateEyeColor1,
    updateEyeColor2,
    updateEyeColor3,
    updateLogoImage,
    updateLogoWidth,
    updateLogoHeight,
    updateLogoOpacity,
    updateRemoveQrCodeBehindLogo,
    updateLogoPadding,
    updateLogoPaddingStyle,
    updateEyeRadius1,
    updateEyeRadius2,
    updateEyeRadius3,
    updateEnableCORS,
    updateQuietZone,
    updateQrStyle
  }
}
