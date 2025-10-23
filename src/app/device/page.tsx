'use client'
import { Language, QrCode } from '@/domains'
import { DevicePage } from '@/ui/pages/Device'

export default function Page() {
  return <DevicePage qr={QrCode.default(Language.default())} />
}
