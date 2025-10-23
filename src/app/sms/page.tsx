'use client'
import { QrCode, Language } from '@/domains'
import { SmsPage } from '@/ui/pages/Sms'

export default function Page() {
  return <SmsPage qr={QrCode.default(Language.default())} />
}
