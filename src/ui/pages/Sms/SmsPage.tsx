'use client'
import React, { FC, useState } from 'react'

import { PageWrapper, SmsForm } from '@/ui/fragments'
import { Language, QrCode } from '@/domains'

type Props = {
  language: Language
  qr: QrCode
}

export const SmsPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeQrCodeType('sms'))
  
  return (
    <PageWrapper language={props.language}>
      <SmsForm language={props.language} qr={currentQr} onChange={setCurrentQr} />
    </PageWrapper>
  )
}
