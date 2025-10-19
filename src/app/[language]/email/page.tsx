'use client'
import { Language, QrCode } from '@/domains'
import { EmailPage } from '@/ui/pages/Email'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <EmailPage language={language} qr={QrCode.default(language)} />
}
