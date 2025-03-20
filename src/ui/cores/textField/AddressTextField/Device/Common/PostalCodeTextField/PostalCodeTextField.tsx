import { FC } from 'react'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import { TextField } from '@mui/material'

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
