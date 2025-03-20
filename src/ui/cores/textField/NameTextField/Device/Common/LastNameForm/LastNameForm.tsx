import { FC } from 'react'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField/TextField'

export type LastNameFormProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const LastNameForm: FC<LastNameFormProps> = ({
  value,
  onChange,
  ...textFieldProps
}: LastNameFormProps) => {
  return (
    <TextField
      label={'lastName'}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      {...textFieldProps}
    />
  )
}
