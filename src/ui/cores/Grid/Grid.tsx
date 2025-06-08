import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material'
import { FC } from 'react'

export type GridProps = MuiGridProps

export const Grid: FC<GridProps> = ({ children, ...rest }) => {
  return <MuiGrid {...rest}>{children}</MuiGrid>
}
