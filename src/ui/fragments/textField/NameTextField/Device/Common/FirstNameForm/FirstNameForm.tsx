import { Language } from '@/domains/valueObjects/language'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

export type FirstNameFormProps = {
  value: string
  onChange: (value: string) => void
  language: Language
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label'>

export const FirstNameForm: FC<FirstNameFormProps> = ({
  value,
  onChange,
  language,
  ...textFieldProps
}: FirstNameFormProps) => {
  const locale = language.locale
  return (
    <TextField
      label={locale.word.form.firstName}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      fullWidth
      {...textFieldProps}
    />
  )
}
