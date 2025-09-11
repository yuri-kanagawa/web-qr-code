import { FC, ReactNode } from 'react'
import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material'

export type CardProps = MuiCardProps & {
  children?: ReactNode
}

export const Card: FC<CardProps> = ({ children, ...rest }) => {
  return <MuiCard {...rest}>{children}</MuiCard>
}
