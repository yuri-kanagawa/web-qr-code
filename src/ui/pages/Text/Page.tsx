'use client'
import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { PageWrapper } from '../../fragments/pageWrapper'
import dynamic from 'next/dynamic'
import { FC, useState } from 'react'

const TextForm = dynamic(
  () =>
    import('@/ui/fragments/form/QrForm/TextForm/TextForm').then((mod) => ({
      default: mod.TextForm
    })),
  {
    ssr: false,
    loading: () => <div>Loading...</div>
  }
)

interface Props {
  language: Language
  qr: QrCode
}

export const TextPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(
    props.qr.changeQrCodeType('text')
  )

  return (
    <PageWrapper language={props.language}>
      <TextForm
        language={props.language}
        qr={currentQr}
        onChange={setCurrentQr}
      />
    </PageWrapper>
  )
}
