import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography
} from '@mui/material'
import { FC, useCallback, useMemo } from 'react'

import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { useDisclosure } from '@/hooks/useDisclosure'

type Props = {
  onClick?: () => Promise<string | undefined>
  isValid?: boolean
  language?: Language
  qr?: QrCode
}

export const QrConfirmButton: FC<Props> = ({
  onClick,
  isValid = true,
  language = Language.default(),
  qr
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const locale = language.locale

  const onConfirm = async () => {
    if (!onClick) {
      return
    }
    const result = await onClick()
    if (result) {
      onOpen()
    }
  }

  const onExceed = useCallback(() => {
    if (qr?.qrValue.isUrl || qr?.qrValue.isMap) {
      window.open(qr.qrValue.value)
    }
    onClose()
  }, [qr, onClose])

  const getText = useMemo(() => {
    if (qr?.qrValue.isUrl) {
      return `${locale.word.dialog.qrCodeUrl}\n${locale.word.dialog.qrCodeUrlMessage}`
    }
    if (qr?.qrValue.isMap) {
      return `${locale.word.dialog.qrCodeUrl}\n${locale.word.dialog.qrCodeUrlMessage}`
    }
    if (qr?.qrValue.isSms) {
      return locale.word.dialog.qrCodeSms
    }
    if (qr?.qrValue.isTel) {
      return locale.word.dialog.qrCodePhone
    }
    return ''
  }, [qr, locale])

  const display = useMemo(() => {
    if (qr?.qrValue.isUrl || qr?.qrValue.isMap) {
      return {
        title: locale.word.dialog.qrCodeUrl,
        message: locale.word.dialog.qrCodeUrlMessage
      }
    }
    return undefined
  }, [qr, locale])

  return (
    <>
      {onClick && (
        <Button variant={'contained'} onClick={onConfirm} disabled={!isValid}>
          {locale.word.buttons.confirm}
        </Button>
      )}
      <Dialog onClose={onClose} open={isOpen}>
        {/*<DialogTitle id="alert-dialog-title">{display?.title}</DialogTitle>*/}
        <DialogContent>
          <Stack>
            <Typography whiteSpace={'pre-wrap'}>{getText}</Typography>
            <Typography>{qr?.qrValue.value}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            {locale.word.buttons.close}
          </Button>
          <Button onClick={onExceed} variant="contained" autoFocus>
            {locale.word.buttons.execute}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
