'use client'
import { QrCode, Language } from '@/domains'
import { DevicePage } from '@/ui/pages/Device'

export default function Page() {
  return <DevicePage qr={QrCode.default(Language.default())} />
}
