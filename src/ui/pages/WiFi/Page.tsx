'use client'
import { Language, QrCode } from '@/domains'
import { PageWrapper } from '@/ui/fragments'
import { WiFiForm } from '@/features/qr-code'
import { FC, useState } from 'react'

interface Props {
  language: Language
  qr: QrCode
}
export const WiFiPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToWifi())

  return (
    <PageWrapper language={props.language}>
      <WiFiForm
        language={props.language}
        qr={currentQr}
        onChange={setCurrentQr}
      />
    </PageWrapper>
  )
}
