'use client'
import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import dynamic from 'next/dynamic'
import { FC, useState } from 'react'

const EmailForm = dynamic(
  () =>
    import('@/ui/fragments/form/QrForm/EmailForm/EmailForm').then((mod) => ({
      default: mod.EmailForm
    })),
  {
    ssr: false,
    loading: () => <div>Loading...</div>
  }
)

type Props = {
  language: Language
  qr: QrCode
}

export const EmailPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(
    props.qr.changeQrCodeType('email')
  )

  return (
    <PageWrapper language={props.language}>
      <EmailForm
        language={props.language}
        qr={currentQr}
        onChange={setCurrentQr}
      />
    </PageWrapper>
  )
}
