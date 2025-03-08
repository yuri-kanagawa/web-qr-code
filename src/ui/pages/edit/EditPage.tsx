'use client'
import React, { FC } from 'react'
import { useQrcode } from '@/hooks'
import { PageWrapper } from '../../fragments/pageWrapper'
import { TextField } from '@mui/material'

type Props = {}

export const EditPage: FC<Props> = ({}) => {
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
