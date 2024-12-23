import { FC } from 'react'
import { Slider, SliderProps } from '@mui/material'

type Props = {
  value: number
  onChange: (value: number) => void
} & Omit<SliderProps, 'value' | 'onChange' | 'step'>

export const Step01Slider: FC<Props> = ({ value, onChange, ...rest }) => {
  return (
    <Slider
      value={value}
      {...rest}
      step={0.01}
      onChange={(event, value) => onChange(Number(value))}
    />
  )
}
