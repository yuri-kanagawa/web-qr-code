'use client'
import { PageWrapper, ContactForm } from '@/ui/fragments'
import { Language } from '@/domains/valueObjects/language'

import React, { FC } from 'react'

interface Props {
  language: Language
  firstName: string
  lastName: string
  middleName: string
  email: string
  organization: string
  url: string
  phoneNumber: string
  post: string
  businessCellularTelephone: string
  privateCellularTelephone: string
  address: string
}

export const Page: FC<Props> = (props) => {
  return (
    <PageWrapper language={props.language}>
      <ContactForm {...props} />
    </PageWrapper>
  )
}
