'use client'
import { Language } from '@/domains'
import { Page as PhonePage } from '@/ui/pages/phone'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <PhonePage language={language} />
}
