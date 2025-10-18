import { Language } from '@/domains/valueObjects/language'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import { FC } from 'react'
import { BasePhoneTextField } from './internal/BasePhoneTextField'

type Props = {
  value: string
  onChange: (value: string) => void
  language: Language
  label?: string
  isRequired?: boolean
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label' | 'isRequired'>

export const CellPhoneTextField: FC<Props> = ({
  language,
  label,
  isRequired = true,
  ...rest
}) => {
  const locale = language.locale
  const displayLabel = label || locale.word.form.phoneNumber
  return (
    <BasePhoneTextField
      {...rest}
      language={language}
      label={displayLabel}
      isRequired={isRequired}
    />
  )
}
