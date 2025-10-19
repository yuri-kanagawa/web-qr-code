'use client'
import { Language, QrCode } from '@/domains'
import { PageWrapper, MapForm } from '@/ui/fragments/'
import { FC, useState } from 'react'

interface Props {
  language: Language
  qr: QrCode
}
export const MapPage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(
    props.qr.changeQrCodeType('map')
  )

  return (
    <PageWrapper language={props.language}>
      <MapForm
        language={props.language}
        qr={currentQr}
        onChange={setCurrentQr}
      />
    </PageWrapper>
  )
}
