'use client'
import { Language, QrCode } from '@/domains'
import { WiFiPage } from '@/ui/pages/WiFi'

export default function Page() {
  return <WiFiPage language={Language.default()} qr={QrCode.default()} />
}
