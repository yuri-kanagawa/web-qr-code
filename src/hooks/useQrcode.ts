import { DeviceOsService } from '@/domains/services/deviceOs'
import { Device } from '@/domains/valueObjects/device'
import { Language } from '@/domains/valueObjects/language'
import { Os } from '@/domains/valueObjects/os'
import { SearchParamsManager } from '@/lib/browser'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { useQrCanvas, useQrCodeSettings, useQrOperations } from './qr'

/**
 * QRコード全体を管理する統合フック（リファクタリング版）
 */
export function useQrCode(language: Language = Language.default()) {
  const searchParams = useSearchParams()

  // QR設定（Entity）
  const qrSettings = useQrCodeSettings(language)

  // Canvas管理
  const { canvasRef, getCanvas } = useQrCanvas()

  // QR操作（読み取り・ダウンロード）
  const { onConfirm, onDownload } = useQrOperations(getCanvas)

  // デバイスOS検出
  const deviceOs = searchParams.get('deviceOs')?.split(',').map(Number) ?? []
  const setDeviceOs = (value: string[]) => {
    SearchParamsManager.add({ deviceOs: value })
  }
  const deviceOsIndex = useMemo(() => {
    const os = Os.detect()
    const device = Device.detect()
    const deviceOsValue = DeviceOsService.getDeviceOs(device, os)
    return deviceOs.indexOf(deviceOsValue)
  }, [deviceOs])

  // URL管理
  const urls = searchParams.get('urls')?.split(',') ?? []
  const setUrls = (value: string[]) => {
    SearchParamsManager.add({ urls: value })
  }
  const labels = searchParams.get('labels')?.split(',') ?? []

  // ソーシャルメディア
  const socialMedia =
    searchParams.get('socialMedia')?.split(',').map(Number) ?? []
  const setSocialMedia = (value: number[]) => {
    SearchParamsManager.add({ socialMedia: value })
  }

  return {
    // QR設定（Entity経由）
    ...qrSettings,
    // Canvas
    ref: canvasRef,
    // 操作
    onConfirm,
    onDownload,
    // デバイス・OS
    deviceOs,
    setDeviceOs,
    deviceOsIndex,
    // URL
    urls,
    setUrls,
    labels,
    // ソーシャルメディア
    socialMedia,
    setSocialMedia
  }
}
