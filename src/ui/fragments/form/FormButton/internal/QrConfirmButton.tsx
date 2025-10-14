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
}

export const QrConfirmButton: FC<Props> = ({ onClick, isValid = true }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [qr, setQr] = useState<Qr>(Qr.default())

  const onConfirm = async () => {
    if (!onClick) {
      return
    }
    const result = await onClick()
    if (!result) {
      return
    }
    const qrResult = Qr.create(result, Language.default())
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
      return 'このqrcodeは url です\n別タブで開きますか？'
    }
    if (qr.isSms) {
      return 'このqrcodeはSMSです'
    }
    if (qr.isTel) {
      return 'このqrcodeは電話番号です'
    }
    return ''
  }, [qr])

  const display = useMemo(() => {
    if (qr.isUrl) {
      return {
        title: 'このqrcodeは URL',
        message: '別タブで開きますか？'
      }
    }
    return undefined
  }, [qr])

  return (
    <>
      {onClick && (
        <Button variant={'contained'} onClick={onConfirm} disabled={!isValid}>
          Confirm
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
          <Button onClick={onClose}>閉じる</Button>
          <Button onClick={onExceed} autoFocus>
            実行
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
