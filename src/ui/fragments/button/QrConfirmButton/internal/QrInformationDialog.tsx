import { FC, useMemo } from 'react'

import { Qr } from '@/domains/valueObjects/qr'
import { PathBuilder } from '@/lib/routing'
import { useQr } from '@/stores'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@/ui/cores'
import { useRouter } from 'next/navigation'

type Props = {
  qr: Qr
  onClose: () => void
}

export const QrInformationDialog: FC<Props> = ({ qr, onClose }) => {
  const qrValue = qr.value
  const locale = qr.language.locale

  const title = useMemo(() => {
    if (qr.isSms) {
      return 'SMS'
    }
    if (qr.isUrl || qr.isMap) {
      return 'URL'
    }
    if (qr.isTel) {
      return locale.word.navigation.phone
    }
    return ''
  }, [qr, locale])

  const { push } = useRouter()
  const { setQr } = useQr()

  const onEdit = () => {
    // グローバルステートに保存
    setQr(qr)
    onClose()

    // 共通の編集画面に遷移
    const pathBuilder = new PathBuilder(qr.language)
    push(pathBuilder.edit.content)
  }

  const contentMessage = qr.language.isEnglish
    ? `This QR code contains: ${qrValue}`
    : `このQRコードには次の内容が含まれています: ${qrValue}`

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contentMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          {locale.word.buttons.close}
        </Button>
        <Button onClick={onEdit} variant="contained">
          {locale.word.buttons.edit}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
