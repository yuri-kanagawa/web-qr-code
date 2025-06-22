import { TextField, TextFieldProps } from '@/ui/cores'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'value' | 'onChange' | 'label'>

export const SSIDTextField: FC<Props> = ({
  value,
  onChange,
  children,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      label="SSID"
    >
      {children}
    </TextField>
  )
}
