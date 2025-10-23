'use client'

import { Language, QrCode } from '@/domains'
import { UrlPage } from '@/ui/pages/Url'
import { notFound } from 'next/navigation'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (result.isFailure || !result.language) {
    return notFound()
  }

  return <UrlPage qr={QrCode.default(result.language)} />
}
