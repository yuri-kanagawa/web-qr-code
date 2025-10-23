'use client'

import { QrCode, Language } from '@/domains'
import { TextPage } from '@/ui/pages/Text'

export default function Page() {
  return <TextPage qr={QrCode.default(Language.default())} />
}
