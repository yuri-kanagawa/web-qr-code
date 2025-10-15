'use client'
import { Language } from '@/domains'
import { Page as ReaderPage } from '@/ui/pages/reader'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <ReaderPage language={language} />
}
