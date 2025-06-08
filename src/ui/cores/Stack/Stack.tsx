import { Stack as MuiStack, StackProps as MuiStackProps } from '@mui/material'
import { FC } from 'react'

export type StackProps = MuiStackProps

export const Stack: FC<StackProps> = ({ children, ...props }) => {
  return <MuiStack {...props}>{children}</MuiStack>
}
