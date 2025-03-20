import { FC } from 'react'
import { TextFieldProps } from '@mui/material/TextField/TextField'

export type HomePhoneTextFieldProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const HomePhoneTextField: FC<HomePhoneTextFieldProps> = ({}) => {
  return <></>
}
