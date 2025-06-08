import {
  InputLabel as MuiInputLabel,
  InputLabelProps as MuiInputLabelProps
} from '@mui/material'
import { FC, ReactNode } from 'react'

export type InputLabelProps = MuiInputLabelProps

export const InputLabel: FC<InputLabelProps> = ({ children, ...rest }) => {
  return <MuiInputLabel {...rest}>{children}</MuiInputLabel>
}
