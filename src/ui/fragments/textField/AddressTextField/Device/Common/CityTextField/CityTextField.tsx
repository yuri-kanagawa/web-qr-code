import { TextField, TextFieldProps } from '@/ui/cores'
import { FC } from 'react'

export type CityTextFieldProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const CityTextField: FC<CityTextFieldProps> = ({
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
