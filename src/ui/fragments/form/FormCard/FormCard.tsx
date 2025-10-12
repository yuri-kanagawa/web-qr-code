'use client'
import { FC, ReactNode } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  BoxProps,
  CardProps
} from '@mui/material'

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
