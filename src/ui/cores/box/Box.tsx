import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material'
import { FC, ReactNode } from 'react'

export type BoxProps = MuiBoxProps & {
  children?: ReactNode
}

export const Box: FC<BoxProps> = ({ children, ...rest }) => {
  return <MuiBox {...rest}>{children}</MuiBox>
}
