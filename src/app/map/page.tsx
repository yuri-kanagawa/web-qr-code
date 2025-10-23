'use client'
import { QrCode, Language } from '@/domains'
import { MapPage } from '@/ui/pages/Map'

export default function Page() {
  return <MapPage qr={QrCode.default(Language.default())} />
}
