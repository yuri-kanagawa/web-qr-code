'use client'
import { useQrCode } from '@/hooks'
import { PageWrapper } from '../../fragments/pageWrapper'
import { TextField } from '@mui/material'
import React, { FC } from 'react'
type Props = {}
export const WiFiPage: FC<Props> = ({}) => {
  const { text, setText } = useQrCode()
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
