import { FC } from 'react'
import { NumberTextField } from '../NumberTextField'
import { TextFieldProps } from '@/ui/cores/TextField'

type Props = {
  value: number | undefined
  onChange: (value: number) => void
} & Omit<TextFieldProps, 'value' | 'onChange'>

export const LatitudeTextField: FC<Props> = ({ value, onChange, ...rest }) => {
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
      {...rest}
    />
  )
}
