'use client'
import React, { FC } from 'react'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { EmailForm } from '@/ui/fragments'

type Props = {
  language: string
  email: string
  subject: string
  body: string
}

export const Page: FC<Props> = (props) => {
  return (
    <PageWrapper>
      <EmailForm {...props} />
    </PageWrapper>
  )
}
