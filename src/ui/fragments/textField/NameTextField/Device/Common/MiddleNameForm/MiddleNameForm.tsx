import { Language } from '@/domains/valueObjects/language'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

export type MiddleNameFormProps = {
  value: string
  onChange: (value: string) => void
  language: Language
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label'>
export const MiddleNameForm: FC<MiddleNameFormProps> = ({
  value,
  onChange,
  language,
  ...textFieldProps
}) => {
  const locale = language.locale
  return (
    <TextField
      label={locale.word.form.middleName}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      fullWidth
      {...textFieldProps}
    />
  )
}
