import { FC } from 'react'
import { TextFieldProps } from '@mui/material/TextField/TextField'

export type FaxTextFieldProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const FaxTextField: FC<FaxTextFieldProps> = ({}) => {
  return <></>
}
