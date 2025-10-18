'use client'
import { Language } from '@/domains/valueObjects/language'
import { ContactForm, PageWrapper } from '@/ui/fragments'

import { FC } from 'react'

interface Props {
  language: Language
  firstName: string
  lastName: string
  middleName: string
  email: string
  mobilePhone: string
  homePhone: string
  homeAddress: string
  homeUrl: string
  organization: string
  post: string
  workMobile: string
  workPhone: string
  workAddress: string
  workUrl: string
}

export const ContactPage: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <ContactForm {...props} />
    </PageWrapper>
  )
}
