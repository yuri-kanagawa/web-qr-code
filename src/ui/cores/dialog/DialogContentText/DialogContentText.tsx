import {
  DialogContentText as MuiDialogContentText,
  DialogContentTextProps as MuiDialogContentTextProps
} from '@mui/material'
import { FC } from 'react'

type DialogContentText = MuiDialogContentTextProps

export const DialogContentText: FC<DialogContentText> = ({
  children,
  ...rest
}) => {
  return <MuiDialogContentText {...rest}>{children}</MuiDialogContentText>
}
