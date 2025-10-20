'use client'
import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { TextForm } from '@/features/qr-code'
import { FC, useState } from 'react'
import { PageWrapper } from '../../fragments/pageWrapper'

interface Props {
  language: Language
  qr: QrCode
}

export const TextPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(
    props.qr.changeToText()
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
