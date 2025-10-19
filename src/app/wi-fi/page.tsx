'use client'
import { Language, QrCode } from '@/domains'
import { WiFiPage } from '@/ui/pages/Wi-fi'

export default function Page() {
  return <WiFiPage language={Language.default()} qr={QrCode.default()} />
}
