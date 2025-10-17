'use client'
import { Language } from '@/domains'
import { Page as TextPage } from '@/ui/pages/Text'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <TextPage language={language} text={''} />
}
