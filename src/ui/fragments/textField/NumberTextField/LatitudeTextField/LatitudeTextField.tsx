import { TextFieldProps } from '@/ui/cores/TextField'
import { CircularProgress, InputAdornment } from '@mui/material'
import { FC } from 'react'
import { NumberTextField } from '../NumberTextField'

type Props = {
  value: number | undefined
  onChange: (value: number) => void
  isLoading?: boolean
} & Omit<TextFieldProps, 'value' | 'onChange'>

export const LatitudeTextField: FC<Props> = ({
  value,
  onChange,
  isLoading = false,
  ...rest
}) => {
  return (
    <NumberTextField
      value={value}
      onChange={onChange}
      label="緯度"
      placeholder="例: 35.6762"
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
