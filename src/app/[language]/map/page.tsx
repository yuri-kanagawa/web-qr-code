'use client'
import { MapPage } from '@/ui/pages/Map'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <MapPage language={language} />
}
