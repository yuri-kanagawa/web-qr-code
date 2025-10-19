'use client'
import { Language, QrCode } from '@/domains'
import { DevicePage } from '@/ui/pages/Device'

export default function Page() {
  return <DevicePage language={Language.default()} qr={QrCode.default()} />
}
