import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps
} from '@mui/material'
import { FC } from 'react'

export type Dialog = MuiDialogProps

export const Dialog: FC<Dialog> = ({ children, ...rest }) => {
  return <MuiDialog {...rest}>{children}</MuiDialog>
}
