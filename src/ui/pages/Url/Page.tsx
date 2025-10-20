import { Language, QrCode } from '@/domains'
import { UrlForm } from '@/features/qr-code'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { useState } from 'react'

interface Props {
  language: Language
  qr: QrCode
}

export const UrlPage = (props: Props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(
    props.qr.changeToUrl()
  )
  
  const handleQrChange = (newQr: QrCode) => {
    console.log('UrlPage handleQrChange called with:', newQr.settings.logoFile)
    setCurrentQr(newQr)
  }

  return (
    <PageWrapper language={props.language}>
      <UrlForm
        language={props.language}
        qr={currentQr}
        onChange={handleQrChange}
      />
    </PageWrapper>
  )
}
