import { Language } from '@/domains/valueObjects/language'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  isRequired?: boolean
  language: Language
} & Omit<
  TextFieldProps,
  'value' | 'onChange' | 'isRequired' | 'label' | 'placeholder'
>

export const BodyTextField: FC<Props> = ({
  value,
  onChange,
  isRequired = false,
  language,
  ...rest
}) => {
  const locale = language.locale
  const labelText = locale.word.form.body
  const label = isRequired ? `*${labelText}` : labelText
  const placeholder = locale.word.placeholder.body

  return (
    <TextField
      multiline
      rows={20}
      label={label}
      placeholder={value ? undefined : placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputLabelProps={{ shrink: true }}
      {...rest}
      fullWidth
    />
  )
}
