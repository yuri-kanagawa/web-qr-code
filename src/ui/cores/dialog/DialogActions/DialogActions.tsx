import {
  DialogActions as MuiDialogActions,
  DialogActionsProps as MuiDialogActionsProps
} from '@mui/material'
import { FC } from 'react'

export type DialogActionsProps = MuiDialogActionsProps

export const DialogActions: FC<DialogActionsProps> = ({
  children,
  ...rest
}) => {
  return <MuiDialogActions {...rest}>{children}</MuiDialogActions>
}
