'use client'
import React, { FC } from 'react'

import { PageWrapper, SmsForm } from '@/ui/fragments'

type Props = {
  language: string
  phoneNumber: string
  body: string
}

export const SmsPage: FC<Props> = (props) => {
  return (
    <PageWrapper>
      <SmsForm {...props} />
    </PageWrapper>
  )
}
