import { FC } from 'react'
import { NumberTextField } from '../NumberTextField'
import { TextFieldProps } from '@/ui/cores/TextField'

type Props = {
  value: number | undefined
  onChange: (value: number) => void
} & Omit<TextFieldProps, 'value' | 'onChange'>

export const LongitudeTextField: FC<Props> = ({ value, onChange, ...rest }) => {
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
      {...rest}
    />
  )
}
