import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps
} from '@mui/material'
import { FC } from 'react'
export type TextFieldProps = MuiTextFieldProps

export const TextField: FC<TextFieldProps> = ({ children, ...props }) => {
  return <MuiTextField {...props}>{children}</MuiTextField>
}
