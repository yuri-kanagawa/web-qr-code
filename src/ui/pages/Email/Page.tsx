'use client'
import React, { FC } from 'react'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { EmailForm } from '@/ui/fragments'
import { Language } from '@/domains/valueObjects/language'

type Props = {
  language: Language
  email: string
  subject: string
  body: string
}

export const Page: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <EmailForm {...props} />
    </PageWrapper>
  )
}
