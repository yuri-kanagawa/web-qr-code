'use client'
import React, { FC } from 'react'

import { PageWrapper, SmsForm } from '@/ui/fragments'
import { Language, QrCode } from '@/domains'

type Props = {
  language: Language
  qr: QrCode
}

export const SmsPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <SmsForm language={props.language} qr={props.qr} />
    </PageWrapper>
  )
}
