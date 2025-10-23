'use client'
import { FC, useState } from 'react'

import { QrCode } from '@/domains'
import { SmsForm } from '@/features/qr-code'
import { PageWrapper } from '@/ui/fragments'

interface Props {
  qr: QrCode
}

export const SmsPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToSms())

  return (
    <PageWrapper language={currentQr.language}>
      <SmsForm qr={currentQr} onChange={setCurrentQr} />
    </PageWrapper>
  )
}
