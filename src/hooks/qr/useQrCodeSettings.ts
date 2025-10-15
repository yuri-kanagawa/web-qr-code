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
  const updateEcLevel = useCallback(
    (value: string) => {
      const result = EcLevel.create(value, language)
      if (result.isSuccess && result.ecLevel) {
        SearchParamsManager.add({ ecLevel: result.ecLevel.value })
      }
    },
    [language]
  )

  const updateSize = useCallback(
    (value: number) => {
      const result = QrSize.create(value, language)
      if (result.isSuccess && result.qrSize) {
        SearchParamsManager.add({ size: result.qrSize.value })
      }
    },
    [language]
  )

  const updateFgColor = useCallback(
    (value: string) => {
      const result = QrColor.create(value, language)
      if (result.isSuccess && result.qrColor) {
        SearchParamsManager.add({ fgColor: result.qrColor.value })
      }
    },
    [language]
  )

  const updateBgColor = useCallback(
    (value: string) => {
      const result = QrColor.create(value, language)
      if (result.isSuccess && result.qrColor) {
        SearchParamsManager.add({ bgColor: result.qrColor.value })
      }
    },
    [language]
  )

  const updateEyeColor1 = useCallback(
    (value: string) => {
      const result = QrColor.create(value, language)
      if (result.isSuccess && result.qrColor) {
        SearchParamsManager.add({ eyeColor1: result.qrColor.value })
      }
    },
    [language]
  )

  const updateEyeColor2 = useCallback(
    (value: string) => {
      const result = QrColor.create(value, language)
      if (result.isSuccess && result.qrColor) {
        SearchParamsManager.add({ eyeColor2: result.qrColor.value })
      }
    },
    [language]
  )

  const updateEyeColor3 = useCallback(
    (value: string) => {
      const result = QrColor.create(value, language)
      if (result.isSuccess && result.qrColor) {
        SearchParamsManager.add({ eyeColor3: result.qrColor.value })
      }
    },
    [language]
  )

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

  const updateQrStyle = useCallback(
    (value: string | null | undefined) => {
      const result = QrStyle.create(value, language)
      if (result.isSuccess && result.qrStyle) {
        if (result.qrStyle.value) {
          SearchParamsManager.add({ qrStyle: result.qrStyle.value })
        } else {
          SearchParamsManager.remove(['qrStyle'])
        }
      }
    },
    [language]
  )

  return {
    settings,
    // Setters
    updateEcLevel,
    updateSize,
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
