import { Language } from '@/domains/valueObjects/language'
import { TextField, TextFieldProps } from '@mui/material'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  language: Language
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label'>

export const OrganizationForm: FC<Props> = ({
  value,
  onChange,
  language,
  ...rest
}: Props) => {
  const locale = language.locale
  return (
    <TextField
      label={locale.word.form.organization}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      {...rest}
    />
  )
}
