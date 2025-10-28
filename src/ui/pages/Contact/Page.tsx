'use client'
import { QrCode } from '@/domains'
import { ContactForm } from '@/features/qr-code'
import { PageWrapper } from '@/ui/fragments'
import { FC, useState } from 'react'
import { useDetectCountry } from '../hooks/useDetectCountry'

interface Props {
  qr: QrCode
}

export const ContactPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToContact())
  const { detectedCountry, isLoading } = useDetectCountry(currentQr.language)

  return (
    <PageWrapper language={currentQr.language}>
      <ContactForm
        qr={currentQr}
        onChange={setCurrentQr}
        detectedCountry={detectedCountry}
        isCountryDetecting={isLoading}
      />
    </PageWrapper>
  )
}
