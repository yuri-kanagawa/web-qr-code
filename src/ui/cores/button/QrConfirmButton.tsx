import React, { FC, useCallback, useMemo, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography
} from '@mui/material'
import { isUrl } from '@/utils/qr'
import { useDisclosure } from '@/hooks/useDisclosure'

type Props = {
  onClick?: () => Promise<string | undefined>
  isValid?: boolean
}

export const QrConfirmButton: FC<Props> = ({ onClick, isValid = true }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [qrValue, setQrValue] = useState('')
  const onConfirm = async () => {
    console.log('onConfirm', onConfirm)
    if (!onClick) {
      return
    }
    console.log('onConfirfasdfsm')
    const result = await onClick()
    console.log('result', result)
    if (!result) {
      return
    }
    onOpen()
    setQrValue(result)
  }

  const onExceed = useCallback(() => {
    if (isUrl(qrValue)) {
      window.open(qrValue)
    }
    onClose()
  }, [qrValue])

  const getText = (value: string) => {
    if (isUrl(value)) {
      return 'このqrcodeは url です\n別タブで開きますか？'
    }
    return ''
  }

  const getTitle = (value: string) => {
    if (isUrl(value)) {
    }
  }

  const text = useMemo(() => {
    if (isUrl(qrValue)) {
      return 'このqrcode は url です\\n別タブで開きますか？'
    }
    return ''
  }, [qrValue])
  const getContents = (value: string) => {
    if (isUrl(value)) {
      return value
    }
  }

  const display = useMemo(() => {
    if (isUrl(qrValue)) {
      return {
        title: 'このqrcodeは URL',
        message: '別タブで開きますか？'
      }
    }
    return undefined
  }, [qrValue])

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
            <Typography whiteSpace={'pre-wrap'}>{getText(qrValue)}</Typography>
            <Typography>{qrValue}</Typography>
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
