'use client'
import React, { FC } from 'react'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { EmailForm } from '@/ui/fragments'
import { QrCode } from '@/domains'

type Props = {
  language: Language
  qr: QrCode
}

export const EmailPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <EmailForm language={props.language} qr={props.qr} />
    </PageWrapper>
  )
}
