import {
  ListItemIcon as MuiListItemIcon,
  ListItemIconProps as MuiListItemIconProps
} from '@mui/material'
import { FC } from 'react'

type ListItemIconProps = MuiListItemIconProps

export const ListItemIcon: FC<ListItemIconProps> = ({ children, ...rest }) => {
  return <MuiListItemIcon>{children}</MuiListItemIcon>
}
