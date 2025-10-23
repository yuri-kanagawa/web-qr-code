import { QrCode } from '@/domains'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { FC, useState } from 'react'

import { PhoneForm } from '@/features/qr-code'

interface Props {
  qr: QrCode
}

export const PhonePage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(props.qr.changeToPhone())

  console.log('PhonePage currentQr:', currentQr.qrValue.value)

  return (
    <PageWrapper language={currentQr.language}>
      <PhoneForm
        language={currentQr.language}
        qr={currentQr}
        onChange={(newQr) => {
          console.log('PhonePage onChange:', newQr.qrValue.value)
          setCurrentQr(newQr)
        }}
      />
    </PageWrapper>
  )
}
