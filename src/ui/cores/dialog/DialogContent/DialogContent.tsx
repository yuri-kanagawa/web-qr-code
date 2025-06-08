import {
  DialogContent as MuiDialogContent,
  DialogContentProps as MuiDialogContentProps,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { FC } from 'react'

type DialogContentProps = MuiDialogContentProps

export const DialogContent: FC<DialogContentProps> = ({
  children,
  ...rest
}) => {
  return <MuiDialogContent {...rest}>{children}</MuiDialogContent>
}
