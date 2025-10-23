'use client'
import { QrCode } from '@/domains'
import { TextForm } from '@/features/qr-code'
import { FC, useState } from 'react'
import { PageWrapper } from '../../fragments/pageWrapper'

interface Props {
  qr: QrCode
}

export const TextPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToText())

  return (
    <PageWrapper language={currentQr.language}>
      <TextForm qr={currentQr} onChange={setCurrentQr} />
    </PageWrapper>
  )
}
