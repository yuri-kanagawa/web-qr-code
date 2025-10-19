'use client'
import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { ContactForm, PageWrapper } from '@/ui/fragments'

import { FC, useState } from 'react'

interface Props {
  language: Language
  qr: QrCode
}

export const ContactPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeQrCodeType('contact'))
  
  return (
    <PageWrapper language={props.language}>
      <ContactForm language={props.language} qr={currentQr} onChange={setCurrentQr} />
    </PageWrapper>
  )
}
