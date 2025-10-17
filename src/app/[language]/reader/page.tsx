'use client'
import { ReaderPage } from '@/ui/pages/Reader'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <ReaderPage language={language} />
}
