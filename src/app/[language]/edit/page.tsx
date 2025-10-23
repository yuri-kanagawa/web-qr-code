'use client'
import { Language } from '@/domains'
import { EditPage } from '@/ui/pages/Edit/Page'
import { notFound } from 'next/navigation'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (result.isFailure || !result.language) {
    return notFound()
  }

  return <EditPage language={result.language} />
}
