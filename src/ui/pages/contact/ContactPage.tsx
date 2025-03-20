'use client'

import { PageWrapper } from '../../fragments/pageWrapper'
import { useQrcode } from '@/hooks'
import { TextField } from '@mui/material'
import React, { FC } from 'react'
import { ContactForm } from '@/ui/pages/contact/internal'

type Props = {}

export const ContactPage: FC<Props> = ({}) => {
  return (
    <PageWrapper>
      <ContactForm />
    </PageWrapper>
  )
}
