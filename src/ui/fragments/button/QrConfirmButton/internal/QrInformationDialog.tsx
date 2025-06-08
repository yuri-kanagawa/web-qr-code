import { FC, useMemo } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { isSms } from '@/ui/pages/Sms/hooks/utils'
import { isUrl } from '@/ui/pages/Url/hooks/utils'

type Props = {
  qrInformation: string
  setQrInformation: (qrInformation: string) => void
  agree?: {
    label: string
    onAgree: () => void
  }
}

export const QrInformationDialog: FC<Props> = ({
  qrInformation,
  setQrInformation,
  agree
}) => {
  const onClose = () => setQrInformation('')
  const title = useMemo(() => {
    if (isSms(qrInformation)) {
      return 'SMS'
    }
    if (isUrl(qrInformation)) {
      return 'URL'
    }
    return ''
  }, [qrInformation])

  return (
    <Dialog
      open={qrInformation !== ''}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Disagree</Button>
        {agree && (
          <Button onClick={agree.onAgree} autoFocus>
            {agree.label}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
