'use client'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography
} from '@mui/material'
import { FC, useCallback, useMemo } from 'react'

import { QrCode } from '@/domains'
import { useDisclosure } from '@/hooks/useDisclosure'

type Props = {
  onClick?: () => Promise<string | undefined>
  isValid?: boolean
  qr: QrCode
  isLoading?: boolean
}

export const ConfirmButton: FC<Props> = ({
  onClick,
  isValid = true,
  qr,
  isLoading = false
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const locale = qr.language.locale

  const onConfirm = async () => {
    console.log('=== ConfirmButton onConfirm 開始 ===')
    console.log('onClick存在チェック:', !!onClick)
    console.log('isValid:', isValid)

    if (!onClick) {
      console.log('onClickが存在しません')
      return
    }
    try {
      console.log('onClick実行開始')
      await onClick()
      console.log('onClick実行完了、モーダルを開きます')
      // onClickが成功したらモーダルを開く
      onOpen()
    } catch (error) {
      console.error('Confirm処理でエラー:', error)
      // エラーの場合はモーダルを開かない
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
      <Button
        variant={'contained'}
        onClick={(e) => {
          console.log('=== ボタンクリックイベント発火 ===')
          console.log('イベント:', e)
          console.log('disabled:', !isValid || isLoading)
          if (!isLoading) {
            // onClick が渡されていなければモーダルを開くだけで完結
            if (!onClick) {
              onOpen()
              return
            }
            onConfirm()
          }
        }}
        disabled={!isValid || isLoading}
      >
        {isLoading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
            {qr.language.isEnglish ? 'Processing...' : '処理中...'}
          </>
        ) : (
          locale.word.buttons.confirm
        )}
      </Button>
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
