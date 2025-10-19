'use client'
import React, { FC } from 'react'
import { PageWrapper } from '../../fragments/pageWrapper'
import { TextForm } from '@/ui/fragments'
import { QrCode } from '@/domains'

interface Props {
  language: Language
  qr: QrCode
}

export const TextPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <TextForm language={props.language} qr={props.qr} />
    </PageWrapper>
  )
}
