'use client'
import React, { FC, useState } from 'react'
import { PageWrapper } from '@/ui/fragments/pageWrapper'

import { PhoneForm } from './internal'

type Props = {}

export const PhonePage: FC<Props> = ({}) => {
  const [value, setValue] = useState('')
  return (
    <PageWrapper>
      <PhoneForm />
    </PageWrapper>
  )
}
