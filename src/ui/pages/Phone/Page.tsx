'use client'
import React, { FC, useState } from 'react'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { Language } from '@/domains/valueObjects/language'

import { PhoneForm } from './internal'

interface Props {
  language: Language
}

export const PhonePage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <PhoneForm {...props} />
    </PageWrapper>
  )
}
