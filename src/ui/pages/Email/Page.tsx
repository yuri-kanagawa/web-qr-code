'use client'
import { QrCode } from '@/domains'
import { EmailForm } from '@/ui/fragments'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { FC } from 'react'

type Props = {
  language: Language
  qr: QrCode
}

export const EmailPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <EmailForm language={props.language} qr={props.qr} />
    </PageWrapper>
  )
}
