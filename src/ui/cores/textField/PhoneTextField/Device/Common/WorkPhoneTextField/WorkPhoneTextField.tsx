import { FC } from 'react'
import { TextFieldProps } from '@mui/material/TextField/TextField'

export type WorkPhoneTextFieldProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const WorkPhoneTextField: FC<WorkPhoneTextFieldProps> = ({}) => {
  return <></>
}
