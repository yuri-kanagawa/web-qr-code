'use client'
import React, { FC } from 'react'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { EmailForm } from './internal'

type Props = {
  language?: string
}

export const EmailPage: FC<Props> = ({ language }) => {
  return (
    <PageWrapper>
      <EmailForm />
    </PageWrapper>
  )
}
