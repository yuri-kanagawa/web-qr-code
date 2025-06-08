import { FC } from 'react'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'

export type PostalCodeTextFieldProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const PostalCodeTextField: FC<PostalCodeTextFieldProps> = ({
  value,
  onChange,
  ...textFieldProps
}) => {
  return (
    <TextField
      label={'email'}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      {...textFieldProps}
    />
  )
}
