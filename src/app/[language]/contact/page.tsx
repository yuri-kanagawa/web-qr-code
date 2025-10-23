'use client'
import { QrCode } from '@/domains'
import { ContactPage } from '@/ui/pages/Contact'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <ContactPage qr={QrCode.default(language)} />
}
