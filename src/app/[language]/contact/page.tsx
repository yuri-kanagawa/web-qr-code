'use client'
import { Language, QrCode } from '@/domains'
import { ContactPage } from '@/ui/pages/Contact'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <ContactPage language={language} qr={QrCode.default(language)} />
}
