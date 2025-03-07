'use client'
import { useQrcode } from '@/hooks'
import { PageWrapper } from '@/ui/cores/pageWrapper'
import { Box, TextField } from '@mui/material'
import React from 'react'

export const TextReadPage = () => {
  const { text } = useQrcode()
  return (
    <PageWrapper>
      <Box
        sx={{
          width: '100%',
          height: '100vh',

          display: 'flex',
          // flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TextField
          placeholder="MultiLine with rows: "
          multiline
          rows={40}
          sx={{
            width: '80%'
          }}
          value={text}
          disabled
        />
      </Box>
    </PageWrapper>
  )
}
