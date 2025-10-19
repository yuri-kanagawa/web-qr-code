'use client'
import { Language, QrCode } from '@/domains'
import { DevicePage } from '@/ui/pages/Device'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <DevicePage language={language} qr={QrCode.default(language)} />
}
