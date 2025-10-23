'use client'
import { QrCode } from '@/domains'
import { WiFiForm } from '@/features/qr-code'
import { PageWrapper } from '@/ui/fragments'
import { FC, useState } from 'react'

interface Props {
  qr: QrCode
}
export const WiFiPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToWifi())

  return (
    <PageWrapper language={currentQr.language}>
             <WiFiForm
               qr={currentQr}
               onChange={setCurrentQr}
             />
    </PageWrapper>
  )
}
