import { Language } from '@/domains/valueObjects/language'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  language: Language
  isRequired?: boolean
} & Omit<TextFieldProps, 'value' | 'onChange' | 'label'>

export const TextTextField: FC<Props> = ({
  value,
  onChange,
  language,
  isRequired = false,
  ...rest
}) => {
  const label = language.isEnglish
    ? isRequired
      ? '*Text'
      : 'Text'
    : isRequired
      ? '*テキスト'
      : 'テキスト'

  return (
    <TextField
      {...rest}
      label={label}
      multiline
      minRows={20}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  )
}
