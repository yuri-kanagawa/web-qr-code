'use client'
import { RootPage } from '@/ui/pages'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('./utils')
  const language = getLanguageFromParams(params.language)

  return <RootPage language={language} />
}
