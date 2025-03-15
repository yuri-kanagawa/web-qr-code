'use client'
import React, { FC } from 'react'
import { useQrcode } from '@/hooks'
import { PageWrapper } from '../../fragments/pageWrapper'
import { TextField } from '@mui/material'
import { FileReader } from './_internal'
type Props = {}

export const ReaderPage: FC<Props> = ({}) => {
  const { text, setText } = useQrcode()
  return (
    <PageWrapper>
      <FileReader />
    </PageWrapper>
  )
}
