import { TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

export type HomePhoneTextFieldProps = {
  value: string
  onChange: (value: string) => void
  isRequired?: boolean
} & Omit<TextFieldProps, 'onChange' | 'value' | 'isRequired'>

export const HomePhoneTextField: FC<HomePhoneTextFieldProps> = ({}) => {
  return <></>
}
