'use client'
import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { EmailForm } from '@/ui/fragments'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { FC, useState } from 'react'

type Props = {
  language: Language
  qr: QrCode
}

export const EmailPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(
    props.qr.changeToEmail()
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
