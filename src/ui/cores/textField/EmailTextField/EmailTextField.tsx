import { FC } from 'react'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import { TextField } from '@mui/material'

type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const EmailTextField: FC<Props> = ({
  value,
  onChange,
  ...textFieldProps
}: Props) => {
  return (
    <TextField
      label={'email'}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      {...textFieldProps}
    />
  )
}
