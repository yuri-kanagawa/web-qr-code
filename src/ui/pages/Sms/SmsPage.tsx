'use client'
import React, { FC, useState } from 'react'

import { PageWrapper } from '@/ui/fragments'
import { SmsForm } from '@/features/qr-code'
import { Language, QrCode } from '@/domains'

type Props = {
  language: Language
  qr: QrCode
}

export const SmsPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToSms())
  
  return (
    <PageWrapper language={props.language}>
      <SmsForm language={props.language} qr={currentQr} onChange={setCurrentQr} />
    </PageWrapper>
  )
}
