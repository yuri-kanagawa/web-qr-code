import { FC, ReactNode } from 'react'
import {
  CardContent as MuiCardContent,
  CardContentProps as MuiCardContentProps
} from '@mui/material'

export type CardContentProps = MuiCardContentProps & {
  children?: ReactNode
}

export const CardContent: FC<CardContentProps> = ({ children, ...rest }) => {
  return <MuiCardContent {...rest}>{children}</MuiCardContent>
}
