import React, { FC } from 'react'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'

type Props = {
  value: string
  onChange: (value: string) => void
  isRequired: boolean
} & Omit<TextFieldProps, 'value' | 'onChange' | 'isRequired'>

export const BodyTextField: FC<Props> = ({
  value,
  onChange,
  isRequired,
  ...rest
}) => {
  return (
    <TextField
      multiline
      rows={20}
      value={value}
      {...rest}
      label={isRequired ? '*body' : 'body'}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
