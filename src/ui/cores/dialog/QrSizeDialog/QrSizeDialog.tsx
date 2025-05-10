import React, { FC } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'
import { useQrcode } from '@/hooks'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const QrSizeDialog: FC<Props> = ({ isOpen, onClose }) => {
  const { size, setSize } = useQrcode()
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'サイズ'}</DialogTitle>
      <DialogContent>
        <TextField
          value={size}
          inputProps={{
            style: { textAlign: 'right' } // これを追加すると確実に右寄せされる
          }}
          onChange={(event) => {
            const value = Number(event.currentTarget.value)

            setSize(value)
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Disagree</Button>
      </DialogActions>
    </Dialog>
  )
}
