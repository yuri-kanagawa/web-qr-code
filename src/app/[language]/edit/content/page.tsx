'use client'
import { EditContentPage } from '@/ui/pages/Edit/Content/Page'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const { getLanguageFromParams } = require('../../utils')
  const language = getLanguageFromParams(params.language)

  return <EditContentPage language={language} />
}
