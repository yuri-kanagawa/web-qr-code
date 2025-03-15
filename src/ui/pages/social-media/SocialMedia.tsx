'use client'
import React, { FC } from 'react'
import { useQrcode } from '@/hooks'
import { PageWrapper } from '../../fragments/pageWrapper'

import { SocialMediaUrl } from './_internal'

type Props = {}

export const SocialMedia: FC<Props> = () => {
  return (
    <PageWrapper>
      <SocialMediaUrl />
    </PageWrapper>
  )
}
