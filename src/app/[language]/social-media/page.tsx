'use client'
import { Language } from '@/domains'
import { SocialMediaPage } from '@/ui/pages/Social-media'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <SocialMediaPage language={language} />
}
