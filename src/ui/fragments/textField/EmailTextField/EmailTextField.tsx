import { Language } from '@/domains/valueObjects/language'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  language: Language
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label' | 'placeholder'>

export const EmailTextField: FC<Props> = ({
  value,
  onChange,
  language,
  ...textFieldProps
}: Props) => {
  const locale = language.locale
  const label = locale.word.form.email
  const placeholder = locale.word.placeholder.email

  return (
    <TextField
      label={label}
      placeholder={value ? undefined : placeholder}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      InputLabelProps={{ shrink: true }}
      {...textFieldProps}
    />
  )
}
