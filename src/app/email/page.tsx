'use client'
import { Language, QrCode } from '@/domains'
import { EmailPage } from '@/ui/pages/Email'

export default function Page() {
  return <EmailPage language={Language.default()} qr={QrCode.default()} />
}
