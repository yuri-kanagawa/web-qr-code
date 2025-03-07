'use client'
import { useQrcode } from '@/hooks'
import { PageWrapper } from '@/ui/cores/pageWrapper'
import { TextField } from '@mui/material'
import React, { FC } from 'react'
type Props = {}
export const WiFiPage: FC<Props> = ({}) => {
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
