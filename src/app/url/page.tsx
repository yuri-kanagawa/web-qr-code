'use client'
import { QrCode, Language } from '@/domains'
import { UrlPage } from '@/ui/pages/Url'

export default function Page() {
  return <UrlPage qr={QrCode.default(Language.default())} />
}
