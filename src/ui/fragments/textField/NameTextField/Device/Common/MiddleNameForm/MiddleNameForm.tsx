import { FC } from 'react'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'

export type MiddleNameFormProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>
export const MiddleNameForm: FC<MiddleNameFormProps> = ({
  value,
  onChange,
  ...textFieldProps
}) => {
  return (
    <TextField
      label={'middleName'}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      {...textFieldProps}
    />
  )
}
