import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton
} from '@mui/material'
import { FC, ReactNode } from 'react'

export type ButtonProps = MuiButtonProps

export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return <MuiButton {...rest}>{children}</MuiButton>
}
