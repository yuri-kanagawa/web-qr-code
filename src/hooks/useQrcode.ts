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

  // テキストコンテンツ
  const text = searchParams.get('text') ?? ''
  const setText = (value: string) => SearchParamsManager.add({ text: value })

  // 連絡先情報
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

  // 電話番号
  const phoneNumber = searchParams.get('phoneNumber') ?? ''
  const resetPhoneNumber = () => SearchParamsManager.remove(['phoneNumber'])
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

  // メッセージ本文
  const body = searchParams.get('body') ?? ''
  const resetBody = () => SearchParamsManager.remove(['body'])
  const setQrValue = (value: string) => {
    SearchParamsManager.add({ qrValue: value })
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
    setSocialMedia,
    // コンテンツ
    text,
    setText,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    middleName,
    setMiddleName,
    email,
    setEmail,
    phoneNumber,
    resetPhoneNumber,
    cellPhone,
    setCellPhone,
    fax,
    setFax,
    homePhone,
    setHomePhone,
    workPhone,
    setWorkPhone,
    body,
    resetBody,
    setQrValue
  }
}
