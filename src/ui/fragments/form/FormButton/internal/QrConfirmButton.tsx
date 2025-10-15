import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography
} from '@mui/material'
import { FC, useCallback, useMemo, useState } from 'react'

import { Language } from '@/domains/valueObjects/language'
import { Qr } from '@/domains/valueObjects/qr'
import { useDisclosure } from '@/hooks/useDisclosure'

type Props = {
  onClick?: () => Promise<string | undefined>
  isValid?: boolean
  language?: Language
}

export const QrConfirmButton: FC<Props> = ({ 
  onClick, 
  isValid = true,
  language = Language.default()
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [qr, setQr] = useState<Qr>(Qr.default())
  const locale = language.getLocale()

  const onConfirm = async () => {
    if (!onClick) {
      return
    }
    const result = await onClick()
    if (!result) {
      return
    }
    const qrResult = Qr.create(result, language)
    if (qrResult.isSuccess && qrResult.qr) {
      setQr(qrResult.qr)
      onOpen()
    }
  }

  const onExceed = useCallback(() => {
    if (qr.isUrl) {
      window.open(qr.value)
    }
    onClose()
  }, [qr, onClose])

  const getText = useMemo(() => {
    if (qr.isUrl) {
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
    if (qr.isUrl) {
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
          <Button onClick={onClose}>{locale.word.buttons.close}</Button>
          <Button onClick={onExceed} autoFocus>
            {locale.word.buttons.execute}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
