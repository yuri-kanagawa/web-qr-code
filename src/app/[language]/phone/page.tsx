'use client'
import { PhonePage } from '@/ui/pages/Phone'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <PhonePage language={language} />
}
