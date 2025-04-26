'use client'
import React, { FC, useMemo } from 'react'
import { PageWrapper } from '../../fragments/pageWrapper'
import { TextField } from '@mui/material'
import { useQrcode } from '@/hooks'

type Props = {}

export const TextPage: FC<Props> = ({}) => {
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
