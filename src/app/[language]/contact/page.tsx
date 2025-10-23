'use client'
import { QrCode } from '@/domains'
import { ContactPage } from '@/ui/pages/Contact'

type Props = {
  params: { language: string }
}

export default function Page({ params }: Props) {
  const result = Language.create(params.language)
  if (language.isFailure) {
    return notFound()
  }

  return <ContactPage qr={QrCode.default(result.language)} />
}
