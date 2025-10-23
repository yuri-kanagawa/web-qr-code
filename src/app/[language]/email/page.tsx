'use client'

import { Language, QrCode } from '@/domains'
import { EmailPage } from '@/ui/pages/Email'
import { notFound } from 'next/navigation'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (result.isFailure || !result.language) {
    return notFound()
  }

  return <EmailPage qr={QrCode.default(result.language)} />
}
