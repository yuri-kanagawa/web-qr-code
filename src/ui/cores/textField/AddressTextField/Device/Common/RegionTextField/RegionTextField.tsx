import { FC } from 'react'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import { TextField } from '@mui/material'

export type RegionTextFieldProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const RegionTextField: FC<RegionTextFieldProps> = ({
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
