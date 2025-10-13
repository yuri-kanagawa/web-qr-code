'use client'
import { Box, BoxProps, Card, CardProps } from '@mui/material'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  boxProps?: BoxProps
  cardProps?: CardProps
}

export const FormCard: FC<Props> = ({ children, boxProps, cardProps }) => {
  return (
    <Box {...boxProps}>
      <Card {...cardProps}>{children}</Card>
    </Box>
  )
}

export default FormCard
