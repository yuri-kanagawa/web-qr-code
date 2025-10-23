'use client'

import { Language } from '@/domains'
import { DeviceRedirectPage } from '@/ui/pages/Device/Redirect'
import { notFound } from 'next/navigation'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (result.isFailure || !result.language) {
    return notFound()
  }

  return <DeviceRedirectPage language={result.language} />
}
