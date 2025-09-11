import { FC, ReactNode } from 'react'
import {
  Container as MuiContainer,
  ContainerProps as MuiContainerProps
} from '@mui/material'

export type ContainerProps = MuiContainerProps & {
  children?: ReactNode
}

export const Container: FC<ContainerProps> = ({ children, ...rest }) => {
  return <MuiContainer {...rest}>{children}</MuiContainer>
}
