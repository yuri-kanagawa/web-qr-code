import {
  DialogTitle as MuiDialogTitle,
  DialogTitleProps as MuiDialogTitleProps
} from '@mui/material'
import { FC } from 'react'

type DialogTitleProps = MuiDialogTitleProps

export const DialogTitle: FC<DialogTitleProps> = ({ children, ...rest }) => {
  return <MuiDialogTitle {...rest}>{children}</MuiDialogTitle>
}
