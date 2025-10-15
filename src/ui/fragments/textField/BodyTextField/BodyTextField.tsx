import { Language } from '@/domains/valueObjects/language'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  isRequired?: boolean
  language?: Language
} & Omit<TextFieldProps, 'value' | 'onChange' | 'isRequired' | 'label'>

export const BodyTextField: FC<Props> = ({
  value,
  onChange,
  isRequired = false,
  language = Language.default(),
  ...rest
}) => {
  const labelText = language.isEnglish ? 'Body' : '本文'
  const label = isRequired ? `*${labelText}` : labelText

  return (
    <TextField
      multiline
      rows={20}
      value={value}
      {...rest}
      label={label}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
