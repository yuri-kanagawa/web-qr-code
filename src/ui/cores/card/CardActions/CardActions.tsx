import { FC, ReactNode } from 'react'
import {
  CardActions as MuiCardActions,
  CardActionsProps as MuiCardActionsProps
} from '@mui/material'

export type CardActionsProps = MuiCardActionsProps & {
  children?: ReactNode
}

export const CardActions: FC<CardActionsProps> = ({ children, ...rest }) => {
  return <MuiCardActions {...rest}>{children}</MuiCardActions>
}
