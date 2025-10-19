'use client'
import { Language, QrCode } from '@/domains'
import { PhonePage } from '@/ui/pages/phone'

export default function Page() {
  return <PhonePage language={Language.default()} qr={QrCode.default()} />
}
