import { Language } from '@/domains/valueObjects/language'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  language?: Language
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label'>

export const EmailTextField: FC<Props> = ({
  value,
  onChange,
  language = Language.default(),
  ...textFieldProps
}: Props) => {
  const label = language.isEnglish ? 'Email' : 'メールアドレス'

  return (
    <TextField
      label={label}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      {...textFieldProps}
    />
  )
}
