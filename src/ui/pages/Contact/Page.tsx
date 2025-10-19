'use client'
import { QrCode } from '@/domains'
import { ContactForm, PageWrapper } from '@/ui/fragments'

import { FC } from 'react'

interface Props {
  language: Language
  qr: QrCode
}

export const ContactPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <ContactForm language={props.language} qr={props.qr} />
    </PageWrapper>
  )
}
