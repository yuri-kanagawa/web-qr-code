'use client'
import { Language } from '@/domains'
import { Page as UrlPage } from '@/ui/pages/url'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <UrlPage language={language} url="" />
}
