import { Language } from '@/domains/valueObjects/language'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  language: Language
  label: string
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label'>

/**
 * 基本のNameTextField
 * firstName, middleName, lastNameなどに使用される
 */
export const BaseNameTextField: FC<Props> = ({
  value,
  onChange,
  language,
  label,
  ...rest
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      {...rest}
    />
  )
}
