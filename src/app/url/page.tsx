'use client'
import { Language, QrCode } from '@/domains'
import { UrlPage } from '@/ui/pages/Url'

export default function Page() {
  return <UrlPage language={Language.default()} qr={QrCode.default()} />
}
