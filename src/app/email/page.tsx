'use client'
import { QrCode, Language } from '@/domains'
import { EmailPage } from '@/ui/pages/Email'

export default function Page() {
  return <EmailPage qr={QrCode.default(Language.default())} />
}
