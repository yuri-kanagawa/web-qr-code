'use client'
import { Language, QrCode } from '@/domains'
import { SmsPage } from '@/ui/pages/Sms'

export default function Page() {
  return <SmsPage language={Language.default()} qr={QrCode.default()} />
}
