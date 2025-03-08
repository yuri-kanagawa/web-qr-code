'use client'

import { PageWrapper } from '../../fragments/pageWrapper'
import { useQrcode } from '@/hooks'
import { TextField } from '@mui/material'
import React, { FC } from 'react'

type Props = {}

export const ContactPage: FC<Props> = ({}) => {
  const { text, setText } = useQrcode()
  return (
    <PageWrapper>
      <TextField
        placeholder="MultiLine with rows: "
        multiline
        rows={20}
        sx={{
          width: '30%'
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </PageWrapper>
  )
}
