import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

export type CellPhoneTextFieldProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const CellPhoneTextField: FC<CellPhoneTextFieldProps> = () => {
  return <></>
}
