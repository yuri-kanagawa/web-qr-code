import { Language } from '@/domains/valueObjects/language'
import { TextFieldProps } from '@/ui/cores/TextField'
import { FC } from 'react'
import { BaseNameTextField } from './internal/BaseNameTextField'

type Props = {
  value: string
  onChange: (value: string) => void
  language: Language
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label'>

export const LastNameTextField: FC<Props> = ({ language, ...rest }) => {
  const locale = language.locale
  return (
    <BaseNameTextField
      {...rest}
      language={language}
      label={locale.word.form.lastName}
    />
  )
}
