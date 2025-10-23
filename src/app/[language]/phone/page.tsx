'use client'

import { Language, QrCode } from '@/domains'
import { PhonePage } from '@/ui/pages/Phone'
import { notFound } from 'next/navigation'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (result.isFailure || !result.language) {
    return notFound()
  }

  return <PhonePage qr={QrCode.default(result.language)} />
}
