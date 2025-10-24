'use client'

import { Language } from '@/domains'
import { ReaderPage } from '@/ui/pages/Reader'
import { notFound } from 'next/navigation'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (result.isFailure || !result.language) {
    return notFound()
  }

  return <ReaderPage language={result.language} />
}
