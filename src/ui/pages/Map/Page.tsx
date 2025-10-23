'use client'
import { QrCode } from '@/domains'
import { MapForm } from '@/features/qr-code'
import { PageWrapper } from '@/ui/fragments/'
import { FC, useState } from 'react'

interface Props {
  qr: QrCode
}
export const MapPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToMap())

  return (
    <PageWrapper language={currentQr.language}>
      <MapForm qr={currentQr} onChange={setCurrentQr} />
    </PageWrapper>
  )
}
