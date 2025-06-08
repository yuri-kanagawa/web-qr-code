import { ButtonProps, Button as MuiButton } from '@mui/material'
import { FC, ReactNode } from 'react'

type Props = ButtonProps

export const Button: FC<Props> = ({ children, ...rest }) => {
  return <MuiButton {...rest}>{children}</MuiButton>
}
