'use client'
import { Language, QrCode } from '@/domains'
import { WiFiPage } from '@/ui/pages/Wi-fi'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <WiFiPage language={language} qr={QrCode.default(language)} />
}
