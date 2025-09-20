'use client'
import React, { FC, useState } from 'react'
import { PageWrapper } from '@/ui/fragments/pageWrapper'

import { PhoneForm } from './internal'

interface Props {
  language: string
}

export const Page: FC<Props> = (props) => {
  return (
    <PageWrapper>
      <PhoneForm {...props} />
    </PageWrapper>
  )
}
