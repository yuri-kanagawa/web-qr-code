import { Language } from '@/domains/valueObjects/language'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import { FC } from 'react'
import { BasePhoneTextField } from './internal/BasePhoneTextField'

type Props = {
  value: string
  onChange: (value: string) => void
  language: Language
  isRequired?: boolean
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label' | 'isRequired'>

export const CellPhoneTextField: FC<Props> = ({
  language,
  isRequired = true,
  ...rest
}) => {
  const locale = language.locale
  return (
    <BasePhoneTextField
      {...rest}
      language={language}
      label={locale.word.form.phoneNumber}
      isRequired={isRequired}
    />
  )
}
