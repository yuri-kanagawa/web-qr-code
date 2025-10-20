'use client'
import { Language, QrCode } from '@/domains'
import { PageWrapper } from '@/ui/fragments'
import { DeviceForm } from '@/features/qr-code'
import { useState } from 'react'

interface Props {
  language: Language
  qr: QrCode
}

export const DevicePage = (props: Props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToDevice())
  
  return (
    <PageWrapper language={props.language}>
      <DeviceForm language={props.language} qr={currentQr} onChange={setCurrentQr} />
    </PageWrapper>
  )
}
