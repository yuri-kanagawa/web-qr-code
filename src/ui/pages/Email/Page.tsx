'use client'
import { QrCode } from '@/domains'
import { EmailForm } from '@/features/qr-code'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { FC, useState } from 'react'

interface Props {
  qr: QrCode
}

export const EmailPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToEmail())

  return (
    <PageWrapper language={currentQr.language}>
      <EmailForm qr={currentQr} onChange={setCurrentQr} />
    </PageWrapper>
  )
}
