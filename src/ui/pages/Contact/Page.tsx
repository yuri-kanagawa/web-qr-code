'use client'
import { QrCode } from '@/domains'
import { ContactForm } from '@/features/qr-code'
import { PageWrapper } from '@/ui/fragments'

import { FC, useState } from 'react'

interface Props {
  qr: QrCode
}

export const ContactPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToContact())

  return (
    <PageWrapper language={currentQr.language}>
      <ContactForm qr={currentQr} onChange={setCurrentQr} />
    </PageWrapper>
  )
}
