import {
  Slider as MuiSlider,
  SliderProps as MuiSliderProps
} from '@mui/material'
import { FC } from 'react'

export type SliderProps = MuiSliderProps

export const Slider: FC<SliderProps> = ({ children, ...rest }) => {
  return <MuiSlider {...rest}>{children}</MuiSlider>
}
