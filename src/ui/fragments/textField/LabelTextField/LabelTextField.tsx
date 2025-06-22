import { TextFieldProps, TextField } from '@/ui/cores'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'label' | 'value' | 'onChange'>

export const LabelTextField: FC<Props> = ({
  children,
  value,
  onChange,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      label="label"
    >
      {children}
    </TextField>
  )
}
