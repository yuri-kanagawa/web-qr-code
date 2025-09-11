import { FC, ReactNode } from 'react'
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps
} from '@mui/material'

export type TypographyProps = MuiTypographyProps & {
  children?: ReactNode
}

export const Typography: FC<TypographyProps> = ({ children, ...rest }) => {
  return <MuiTypography {...rest}>{children}</MuiTypography>
}
