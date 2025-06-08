import { FC } from 'react'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'

export type FaxTextFieldProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const FaxTextField: FC<FaxTextFieldProps> = ({}) => {
  return <></>
}
