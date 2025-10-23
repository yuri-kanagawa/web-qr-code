'use client'

import { WiFiPage } from '@/ui/pages/WiFi'

import { Language, QrCode } from '@/domains'
import { notFound } from 'next/navigation'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (result.isFailure || !result.language) {
    return notFound()
  }

  return <WiFiPage qr={QrCode.default(result.language)} />
}
