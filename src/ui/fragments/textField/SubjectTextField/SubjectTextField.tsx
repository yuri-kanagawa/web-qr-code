import { Language } from '@/domains/valueObjects/language'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  language: Language
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label' | 'placeholder'>

export const SubjectTextField: FC<Props> = ({
  value,
  onChange,
  language,
  ...rest
}) => {
  const locale = language.locale
  const label = locale.word.form.subject
  const placeholder = locale.word.placeholder.subject

  return (
    <TextField
      label={label}
      placeholder={value ? undefined : placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputLabelProps={{ shrink: true }}
      {...rest}
    />
  )
}
