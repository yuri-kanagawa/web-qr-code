'use client'
import { Language, QrCode } from '@/domains'
import { UrlPage } from '@/ui/pages/Url'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <UrlPage language={language} qr={QrCode.default(language)} />
}
