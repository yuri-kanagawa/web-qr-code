import {
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps
} from '@mui/material'
import { FC, ReactNode } from 'react'

export type FormControlProps = MuiFormControlProps

export const FormControl: FC<FormControlProps> = ({ children, ...rest }) => {
  return <MuiFormControl {...rest}>{children}</MuiFormControl>
}
