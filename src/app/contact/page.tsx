'use client'
import { Language, QrCode } from '@/domains'
import { ContactPage } from '@/ui/pages/Contact'

export default function Page() {
  return <ContactPage language={Language.default()} qr={QrCode.default()} />
}
