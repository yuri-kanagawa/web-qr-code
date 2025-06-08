import { TextFieldProps } from '@mui/material/TextField/TextField'
import React, { FC } from 'react'
import { TextField } from '@mui/material'

type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'value' | 'onChange'>

export const TextTextField: FC<Props> = ({ value, onChange, ...rest }) => {
  return (
    <TextField
      {...rest}
      multiline
      minRows={20}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
