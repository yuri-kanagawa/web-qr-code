import { QrCode } from '@/domains'
import { UrlForm } from '@/features/qr-code'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { useState } from 'react'

interface Props {
  qr: QrCode
}

export const UrlPage = (props: Props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToUrl())

  const handleQrChange = (newQr: QrCode) => {
    console.log('UrlPage handleQrChange called with:', newQr.settings.logoFile)
    setCurrentQr(newQr)
  }

  return (
    <PageWrapper language={currentQr.language}>
      <UrlForm qr={currentQr} onChange={handleQrChange} />
    </PageWrapper>
  )
}
