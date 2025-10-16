import { Language } from '@/domains/valueObjects/language'
import { TextFieldProps } from '@/ui/cores/TextField'
import { CircularProgress, InputAdornment } from '@mui/material'
import { FC } from 'react'
import { NumberTextField } from '../NumberTextField'

type Props = {
  value: number | undefined
  onChange: (value: number) => void
  language: Language
  isLoading?: boolean
} & Omit<TextFieldProps, 'value' | 'onChange' | 'label'>

export const LongitudeTextField: FC<Props> = ({
  value,
  onChange,
  language,
  isLoading = false,
  ...rest
}) => {
  const locale = language.locale

  return (
    <NumberTextField
      value={value}
      onChange={onChange}
      label={locale.word.map.longitude}
      placeholder={language.isEnglish ? 'e.g. 139.6503' : '例: 139.6503'}
      min={-180}
      max={180}
      isInteger={false}
      decimalPlaces={4}
      InputProps={
        isLoading
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <CircularProgress size={20} />
                </InputAdornment>
              )
            }
          : undefined
      }
      {...rest}
    />
  )
}
