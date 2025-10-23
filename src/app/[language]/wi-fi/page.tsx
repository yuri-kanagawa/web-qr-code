'use client'
import { QrCode } from '@/domains'
import { WiFiPage } from '@/ui/pages/WiFi'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <WiFiPage qr={QrCode.default(language)} />
}
