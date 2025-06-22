'use client'
import React, { FC } from 'react'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { EmailForm } from '@/ui/pages/email/internal'

type Props = {}

export const EmailPage: FC<Props> = ({}) => {
  return (
    <PageWrapper>
      <EmailForm />
    </PageWrapper>
  )
}
