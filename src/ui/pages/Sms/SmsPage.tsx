'use client'
import React, { FC } from 'react'

import { PageWrapper, SmsForm } from '@/ui/fragments'
import { Language } from '@/domains/valueObjects/language'

type Props = {
  language: Language
  phoneNumber: string
  body: string
}

export const SmsPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <SmsForm {...props} />
    </PageWrapper>
  )
}
