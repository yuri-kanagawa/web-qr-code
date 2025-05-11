import { TextFieldProps } from '@mui/material/TextField/TextField'
import { FC } from 'react'

export type CellPhoneTextFieldProps = {
  value: string
  onChange: (value: string) => void
  isValid?: boolean
  message?: string
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const CellPhoneTextField: FC<CellPhoneTextFieldProps> = () => {
  return <></>
}
