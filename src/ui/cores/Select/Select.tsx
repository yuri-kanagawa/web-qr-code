import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps
} from '@mui/material'
import { FC, ReactNode } from 'react'

export type SelectProps = MuiSelectProps

export const Select: FC<SelectProps> = ({ children, ...rest }) => {
  return <MuiSelect {...rest}>{children}</MuiSelect>
}
