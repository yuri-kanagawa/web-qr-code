'use client'
import { Language } from '@/domains'
import { Page as DevicePage } from '@/ui/pages/device'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <DevicePage language={language} />
}
