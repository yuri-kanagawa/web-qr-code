'use client'
import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { PageWrapper } from '@/ui/fragments'
import { ContactForm } from '@/features/qr-code'

import { FC, useState } from 'react'

interface Props {
  language: Language
  qr: QrCode
}

export const ContactPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToContact())

  return (
    <PageWrapper language={props.language}>
      <ContactForm
        language={props.language}
        qr={currentQr}
        onChange={setCurrentQr}
      />
    </PageWrapper>
  )
}
