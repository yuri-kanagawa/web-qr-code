'use client'
import { FC } from 'react'
import { Box, CircularProgress, Typography, BoxProps } from '@mui/material'

type Props = {
  message?: string
  boxProps?: BoxProps
}

export const CenterLoading: FC<Props> = ({ message = '', boxProps }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        background: '#f5f5f5'
      }}
      {...boxProps}
    >
      <CircularProgress size={40} sx={{ mb: 2 }} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  )
}
