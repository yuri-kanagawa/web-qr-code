'use client'
import { Language, QrCode } from '@/domains'
import { ContactPage } from '@/ui/pages/Contact'

export default function Page() {
  return <ContactPage qr={QrCode.default(Language.default())} />
}
