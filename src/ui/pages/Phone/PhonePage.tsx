'use client'
import React, { FC } from 'react'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { TextField } from '@mui/material'
import { EmailTextField } from '@/ui/cores/textField'

type Props = {}

export const PhonePage: FC<Props> = ({}) => {
  return (
    <PageWrapper>
      <EmailTextField value={''} onChange={() => console.log()} />
    </PageWrapper>
  )
}
