import { FC } from 'react'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'

export type StreetAddressTextFieldProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const StreetAddressTextField: FC<StreetAddressTextFieldProps> = ({
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
