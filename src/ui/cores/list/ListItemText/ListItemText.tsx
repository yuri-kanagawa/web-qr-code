import {
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps
} from '@mui/material'
import { FC, ReactNode } from 'react'

export type ListItemTextProps = MuiListItemTextProps & {
  children?: ReactNode
}

export const ListItemText: FC<ListItemTextProps> = ({ children, ...rest }) => {
  return <MuiListItemText {...rest}>{children}</MuiListItemText>
}
