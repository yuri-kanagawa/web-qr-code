import React, { FC } from 'react'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField/TextField'

type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'value' | 'onChange'>

export const BodyTextField: FC<Props> = ({ value, onChange, ...rest }) => {
  return (
    <TextField
      placeholder="MultiLine with rows: "
      multiline
      rows={20}
      sx={{
        width: '30%'
      }}
      value={value}
      {...rest}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
