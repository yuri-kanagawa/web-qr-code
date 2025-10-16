import { Language } from '@/domains/valueObjects/language'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

export type LastNameFormProps = {
  value: string
  onChange: (value: string) => void
  language: Language
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label'>

export const LastNameForm: FC<LastNameFormProps> = ({
  value,
  onChange,
  language,
  ...textFieldProps
}: LastNameFormProps) => {
  const locale = language.locale
  return (
    <TextField
      label={locale.word.form.lastName}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      fullWidth
      {...textFieldProps}
    />
  )
}
