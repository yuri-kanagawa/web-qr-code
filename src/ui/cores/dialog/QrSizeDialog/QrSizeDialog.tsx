import { FC } from 'react'
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
  const {} = useQrcode()
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'サイズ'}</DialogTitle>
      <DialogContent>
        <TextField></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Disagree</Button>
      </DialogActions>
    </Dialog>
  )
}
