import { FC } from 'react'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'

export type HomePhoneTextFieldProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const HomePhoneTextField: FC<HomePhoneTextFieldProps> = ({}) => {
  return <></>
}
