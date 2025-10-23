'use client'
import { Language, QrCode } from '@/domains'
import { DevicePage } from '@/ui/pages/Device'
import { notFound } from 'next/navigation'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (result.isFailure || !result.language) {
    return notFound()
  }

  return <DevicePage qr={QrCode.default(result.language)} />
}
