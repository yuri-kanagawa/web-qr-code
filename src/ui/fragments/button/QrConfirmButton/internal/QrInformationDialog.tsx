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
  DialogTitle,
  Stack,
  Typography
} from '@/ui/cores'
import { useRouter } from 'next/navigation'

type Props = {
  qr: Qr
  onClose: () => void
}

export const QrInformationDialog: FC<Props> = ({ qr, onClose }) => {
  const qrValue = qr.value
  const locale = qr.language.locale

  // Device Redirect URLかどうかを判定
  const isDeviceRedirectUrl = useMemo(() => {
    return qrValue.includes('/device/redirect')
  }, [qrValue])

  // Device Redirect URLの場合、詳細を解析
  const deviceRedirectInfo = useMemo(() => {
    if (!isDeviceRedirectUrl) return null

    try {
      const url = new URL(qrValue)
      const deviceOsParam = url.searchParams.get('deviceOs')
      const urlsParam = url.searchParams.get('urls')

      if (!deviceOsParam || !urlsParam) return null

      const deviceOsIds = deviceOsParam.split(',').map(Number)
      const urls = urlsParam.split(',').map(decodeURIComponent)

      return {
        deviceOsIds,
        urls,
        count: urls.length
      }
    } catch (e) {
      return null
    }
  }, [isDeviceRedirectUrl, qrValue])

  const title = useMemo(() => {
    if (isDeviceRedirectUrl) {
      return qr.language.isEnglish
        ? 'Device Redirect QR Code'
        : 'デバイス振り分けQRコード'
    }
    if (qr.isSms) {
      return 'SMS'
    }
    if (qr.isMap) {
      return qr.language.isEnglish ? 'Map Location' : '地図'
    }
    if (qr.isUrl) {
      return 'URL'
    }
    if (qr.isTel) {
      return locale.word.navigation.phone
    }
    return ''
  }, [qr, locale, isDeviceRedirectUrl])

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

  const handleOpen = () => {
    if (qr.isMap) {
      // 地図URLを新しいタブで開く
      window.open(qrValue, '_blank')
    } else if (qr.isUrl) {
      // 通常のURLを新しいタブで開く
      window.open(qrValue, '_blank')
    } else if (qr.isTel) {
      // 電話番号リンク
      window.location.href = qrValue
    } else if (qr.isSms) {
      // SMSリンク
      window.location.href = qrValue
    }
    onClose()
  }

  const contentMessage = useMemo(() => {
    if (isDeviceRedirectUrl && deviceRedirectInfo) {
      const message = qr.language.isEnglish
        ? `This QR code redirects to ${deviceRedirectInfo.count} different URL(s) based on device/OS.`
        : `このQRコードは、デバイス/OSに応じて${deviceRedirectInfo.count}種類のURLにリダイレクトします。`
      return message
    }
    return qr.language.isEnglish
      ? `This QR code contains: ${qrValue}`
      : `このQRコードには次の内容が含まれています: ${qrValue}`
  }, [qr.language, qrValue, isDeviceRedirectUrl, deviceRedirectInfo])

  const actionButtonLabel = useMemo(() => {
    if (isDeviceRedirectUrl) {
      return qr.language.isEnglish ? 'View Details' : '詳細を見る'
    }
    if (qr.isMap) {
      return qr.language.isEnglish ? 'Open Map' : '地図を開く'
    }
    if (qr.isUrl) {
      return qr.language.isEnglish ? 'Open URL' : 'URLを開く'
    }
    if (qr.isTel) {
      return qr.language.isEnglish ? 'Call' : '電話をかける'
    }
    if (qr.isSms) {
      return qr.language.isEnglish ? 'Send SMS' : 'SMSを送る'
    }
    return null
  }, [qr, isDeviceRedirectUrl])

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText id="alert-dialog-description">
            {contentMessage}
          </DialogContentText>
          {isDeviceRedirectUrl && deviceRedirectInfo && (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {qr.language.isEnglish
                  ? 'Redirect URLs:'
                  : 'リダイレクト先URL:'}
              </Typography>
              {deviceRedirectInfo.urls.map((url, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    wordBreak: 'break-all',
                    pl: 2,
                    color: 'primary.main'
                  }}
                >
                  {index + 1}. {url}
                </Typography>
              ))}
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" color="primary">
          {locale.word.buttons.close}
        </Button>
        <Button onClick={onEdit} variant="contained" color="primary">
          {locale.word.buttons.edit}
        </Button>
        {actionButtonLabel && (
          <Button onClick={handleOpen} variant="contained" color="primary">
            {actionButtonLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
