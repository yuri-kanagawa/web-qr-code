'use client'

import { Language, QrCode } from '@/domains'
import { TextPage } from '@/ui/pages/Text'

export default function Page() {
  return <TextPage language={Language.default()} qr={QrCode.default()} />
}
