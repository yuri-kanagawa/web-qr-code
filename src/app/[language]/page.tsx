'use client'
import { Language } from '@/domains'
import { RootPage } from '@/ui/pages'
import { notFound } from 'next/navigation'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (result.isFailure || !result.language) {
    return notFound()
  }

  return <RootPage language={result.language} />
}
