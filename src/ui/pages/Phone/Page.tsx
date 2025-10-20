'use client'
import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { FC, useState } from 'react'

import { PhoneForm } from '@/ui/fragments/form/QrForm'

interface Props {
  language: Language
  qr: QrCode
}

export const PhonePage: FC<Props> = (props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(
    props.qr.changeToPhone()
  )

  console.log('PhonePage currentQr:', currentQr.qrValue.value)

  return (
    <PageWrapper language={props.language}>
      <PhoneForm
        language={props.language}
        qr={currentQr}
        onChange={(newQr) => {
          console.log('PhonePage onChange:', newQr.qrValue.value)
          setCurrentQr(newQr)
        }}
      />
    </PageWrapper>
  )
}
