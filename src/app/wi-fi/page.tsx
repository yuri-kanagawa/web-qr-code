'use client'
import { QrCode, Language } from '@/domains'
import { WiFiPage } from '@/ui/pages/WiFi'

export default function Page() {
  return <WiFiPage qr={QrCode.default(Language.default())} />
}
