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

export const LatitudeTextField: FC<Props> = ({
  value,
  onChange,
  language,
  isLoading = false,
  ...rest
}) => {
  const locale = language.getLocale()

  return (
    <NumberTextField
      value={value}
      onChange={onChange}
      label={locale.word.map.latitude}
      placeholder={language.isEnglish ? 'e.g. 35.6762' : '例: 35.6762'}
      min={-90}
      max={90}
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
