import { FC } from 'react'

import { QrCode } from '@/domains'
import { PageWrapper } from '../../fragments/pageWrapper'

import { SocialMediaForm } from './_internal'

type Props = {
  qr: QrCode
}

export const SocialMediaPage: FC<Props> = ({ qr }) => {
  return (
    <PageWrapper language={qr.language}>
      <SocialMediaForm qr={qr} onChange={() => {}} />
    </PageWrapper>
  )
}
