import {
  ListItem as MuiListItem,
  ListItemProps as MuiListItemProps
} from '@mui/material'
import { FC } from 'react'

type ListItemProps = MuiListItemProps

export const ListItem: FC<ListItemProps> = ({ children, ...rest }) => {
  return <MuiListItem {...rest}>{children}</MuiListItem>
}
