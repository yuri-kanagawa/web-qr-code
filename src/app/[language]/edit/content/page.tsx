'use client'
import { Language } from '@/domains'
import { EditContentPage } from '@/ui/pages/Edit/Content/Page'
import { notFound } from 'next/navigation'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (result.isFailure || !result.language) {
    return notFound()
  }

  return <EditContentPage language={result.language} />
}
