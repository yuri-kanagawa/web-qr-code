'use client'
import { QrCode } from '@/domains'
import { PhoneForm } from '@/features/qr-code'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { FC, useState } from 'react'
import { useDetectCountry } from '../hooks/detectCountry'

interface Props {
  qr: QrCode
}

export const PhonePage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToPhone())
  const { detectedCountry, isLoading } = useDetectCountry(currentQr.language)

  return (
    <PageWrapper language={currentQr.language}>
      <PhoneForm
        qr={currentQr}
        onChange={setCurrentQr}
        detectedCountry={detectedCountry}
        isCountryDetecting={isLoading}
      />
    </PageWrapper>
  )
}
