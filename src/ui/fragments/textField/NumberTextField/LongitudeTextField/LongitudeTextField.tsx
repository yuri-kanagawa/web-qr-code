import { FC } from 'react'
import { NumberTextField } from '../NumberTextField'
import { TextFieldProps } from '@/ui/cores/TextField'
import { CircularProgress, InputAdornment } from '@mui/material'

type Props = {
  value: number | undefined
  onChange: (value: number) => void
  isLoading?: boolean
} & Omit<TextFieldProps, 'value' | 'onChange'>

export const LongitudeTextField: FC<Props> = ({ 
  value, 
  onChange, 
  isLoading = false,
  ...rest 
}) => {
  return (
    <NumberTextField
      value={value}
      onChange={onChange}
      label="経度"
      placeholder="例: 139.6503"
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
