import { FC } from 'react'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'

type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label'>

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
