'use client'
import { QrCode } from '@/domains'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { FC } from 'react'

import { PhoneForm } from '@/ui/fragments/form/QrForm'

interface Props {
  language: Language
  qr: QrCode
}

export const PhonePage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <PhoneForm language={props.language} qr={props.qr} />
    </PageWrapper>
  )
}
