'use client'
import { EditPage } from '@/ui/pages/Edit/Page'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../utils')
  const language = getLanguageFromParams(params.language)

  return <EditPage language={language} />
}
