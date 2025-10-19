'use client'
import { Language, QrCode } from '@/domains'
import { MapPage } from '@/ui/pages/Map'

export default function Page() {
  return <MapPage language={Language.default()} qr={QrCode.default()} />
}
