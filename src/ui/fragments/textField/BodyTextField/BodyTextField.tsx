import React, { FC } from 'react'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'

type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'value' | 'onChange'>

export const BodyTextField: FC<Props> = ({ value, onChange, ...rest }) => {
  return (
    <TextField
      multiline
      rows={20}
      value={value}
      {...rest}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
