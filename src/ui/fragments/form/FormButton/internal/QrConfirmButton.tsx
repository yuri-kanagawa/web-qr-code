import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography
} from '@mui/material'
import { FC, useCallback, useMemo, useState } from 'react'

import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { Qr as QrValue } from '@/domains/valueObjects/qr'
import { useDisclosure } from '@/hooks/useDisclosure'

type Props = {
  onClick?: () => Promise<string | undefined>
  isValid?: boolean
  language?: Language
  settings?: QrCode
}

export const QrConfirmButton: FC<Props> = ({
  onClick,
  isValid = true,
  language = Language.default(),
  settings
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [qr, setQr] = useState<QrValue>(QrValue.default(language))
  const locale = language.locale

  const onConfirm = async () => {
    if (!onClick) {
      return
    }
    const result = await onClick()
    if (!result) {
      return
    }
    const qrResult = QrValue.create(result, language)
    if (qrResult.isSuccess && qrResult.qr) {
      setQr(qrResult.qr)
      onOpen()
    }
  }

  const onExceed = useCallback(() => {
    if (qr.isUrl || qr.isMap) {
      window.open(qr.value)
    }
    onClose()
  }, [qr, onClose])

  const getText = useMemo(() => {
    if (qr.isUrl) {
      return `${locale.word.dialog.qrCodeUrl}\n${locale.word.dialog.qrCodeUrlMessage}`
    }
    if (qr.isMap) {
      return `${locale.word.dialog.qrCodeUrl}\n${locale.word.dialog.qrCodeUrlMessage}`
    }
    if (qr.isSms) {
      return locale.word.dialog.qrCodeSms
    }
    if (qr.isTel) {
      return locale.word.dialog.qrCodePhone
    }
    return ''
  }, [qr, locale])

  const display = useMemo(() => {
    if (qr.isUrl || qr.isMap) {
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
            <Typography>{qr.value}</Typography>
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
