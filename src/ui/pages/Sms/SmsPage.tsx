'use client'
import React, { FC } from 'react'
import { useQrCode } from '@/hooks'
import { PageWrapper } from '../../fragments/pageWrapper'
import { TextField } from '@mui/material'
import { SmsForm } from './internal'

type Props = {}

export const SmsPage: FC<Props> = ({}) => {

  return (
    <PageWrapper>
      <SmsForm/>
    </PageWrapper>
  )
}
