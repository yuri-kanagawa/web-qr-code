'use client'
import { QrCode } from '@/domains'
import { DeviceForm } from '@/features/qr-code'
import { PageWrapper } from '@/ui/fragments'
import { useState } from 'react'

interface Props {
  qr: QrCode
}

export const DevicePage = (props: Props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToDevice())

  return (
    <PageWrapper language={currentQr.language}>
      <DeviceForm qr={currentQr} onChange={setCurrentQr} />
    </PageWrapper>
  )
}
