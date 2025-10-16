import { TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

export type CellPhoneTextFieldProps = {
  value: string
  onChange: (value: string) => void
  isRequired?: boolean
} & Omit<TextFieldProps, 'onChange' | 'value' | 'isRequired'>

export const CellPhoneTextField: FC<CellPhoneTextFieldProps> = () => {
  return <></>
}
