import { FC } from 'react'
import {
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps
} from '@mui/material'
export type ListItemButtonProps = MuiListItemButtonProps

export const ListItemButton: FC<ListItemButtonProps> = ({
  children,
  ...rest
}) => {
  return <MuiListItemButton {...rest}>{children}</MuiListItemButton>
}
