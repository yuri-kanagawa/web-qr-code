'use client'
import { PageWrapper, ContactForm } from '@/ui/fragments'

import React, { FC } from 'react'

interface Props {
  language: string
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
    <PageWrapper>
      <ContactForm {...props} />
    </PageWrapper>
  )
}
