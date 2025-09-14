import { FC, useMemo } from 'react'
import { fromSmsScheme, isSmsSchema } from '@/ui/pages/sms/hooks/utils'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@/ui/cores'
import { fromTelScheme, isTelScheme } from '@/ui/pages/phone/hooks/utils'
import { useRouter } from 'next/navigation'
import { path } from '@/config/path'
import { isUrl } from '@/constants/qr'

type Props = {
  qrInformation: string
  setQrInformation: (qrInformation: string) => void
}

export const QrInformationDialog: FC<Props> = ({
  qrInformation,
  setQrInformation
}) => {
  const onClose = () => setQrInformation('')
  const title = useMemo(() => {
    if (isSmsSchema(qrInformation)) {
      return 'SMS'
    }
    if (isUrl(qrInformation)) {
      return 'URL'
    }
    if (isTelScheme(qrInformation)) {
      return 'Phone'
    }
    return ''
  }, [qrInformation])

  const { push } = useRouter()

  const onEdit = () => {
    if (isSmsSchema(qrInformation)) {
      const { phoneNumber, body } = fromSmsScheme(qrInformation)
      return push(
        path.sms.index({
          lang: 'en',
          queryParameter: {
            phoneNumber,
            body
          }
        })
      )
    }
    if (isUrl(qrInformation)) {
      return push(
        path.url.index({
          lang: 'en',
          queryParameter: {
            url: qrInformation
          }
        })
      )
    }
    if (isTelScheme(qrInformation)) {
      push(
        path.phone.index({
          lang: 'en',
          queryParameter: {
            phoneNumber: qrInformation
          }
        })
      )
    }
    return ''
  }

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
        <Button onClick={onEdit}>edit</Button>
      </DialogActions>
    </Dialog>
  )
}
