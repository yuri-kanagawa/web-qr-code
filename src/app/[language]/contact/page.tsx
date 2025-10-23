'use client'
import { Language, QrCode } from '@/domains'
import { ContactPage } from '@/ui/pages/Contact'
import { notFound } from 'next/navigation'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (result.isFailure) {
    return notFound()
  }

  return <ContactPage qr={QrCode.default(result.language)} />
}
