import {
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps
} from '@mui/material'
import { FC, ReactNode } from 'react'

export type MenuItemProps = MuiMenuItemProps

export const MenuItem: FC<MenuItemProps> = ({ children, ...rest }) => {
  return <MuiMenuItem {...rest}>{children}</MuiMenuItem>
}
