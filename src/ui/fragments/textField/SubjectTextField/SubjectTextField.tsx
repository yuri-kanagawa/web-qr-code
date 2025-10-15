import { Language } from '@/domains/valueObjects/language'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  language?: Language
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label'>

export const SubjectTextField: FC<Props> = ({
  value,
  onChange,
  language = Language.default(),
  ...rest
}) => {
  const label = language.isEnglish ? 'Subject' : '件名'

  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  )
}
