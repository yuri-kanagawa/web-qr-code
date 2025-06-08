import { TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

export type WorkPhoneTextFieldProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const WorkPhoneTextField: FC<WorkPhoneTextFieldProps> = ({}) => {
  return <></>
}
