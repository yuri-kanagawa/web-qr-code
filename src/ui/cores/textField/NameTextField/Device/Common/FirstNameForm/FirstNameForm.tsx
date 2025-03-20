import { FC } from 'react'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField/TextField'

export type FirstNameFormProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const FirstNameForm: FC<FirstNameFormProps> = ({
  value,
  onChange,
  ...textFieldProps
}: FirstNameFormProps) => {
  return (
    <TextField
      label={'firstName'}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      {...textFieldProps}
    />
  )
}
