import { FC, useMemo } from 'react'

import { QrCode } from '@/domains'
import { useNavigation } from '@/hooks'
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

interface Props {
  qr: QrCode
  onClose: () => void
}

export const QrInformationDialog: FC<Props> = ({ qr, onClose }) => {
  const qrValue = qr.qrValue?.value || ''
  const locale = qr.language.locale

  // Device Redirect URLかどうかを判定
  const isDeviceRedirectUrl = useMemo(() => {
    return qr.qrValue?.isDeviceRedirectUrl || false
  }, [qr.qrValue])

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
      return locale.message.common.qrInformationDialog.titles.deviceRedirect
    }
    if (qr.qrCodeType.isSms) {
      return locale.message.common.qrInformationDialog.titles.sms
    }
    if (qr.qrCodeType.isMap) {
      return locale.message.common.qrInformationDialog.titles.map
    }
    if (qr.qrCodeType.isUrl) {
      return locale.message.common.qrInformationDialog.titles.url
    }
    if (qr.qrCodeType.isPhone) {
      return locale.message.common.qrInformationDialog.titles.phone
    }
    return ''
  }, [qr, locale, isDeviceRedirectUrl])

  const { pathBuilder } = useNavigation(qr.language)
  const { push } = useRouter()
  const { setQr } = useQr()

  const onEdit = () => {
    // グローバルステートに保存
    setQr(qr)
    onClose()

    // 共通の編集画面に遷移
    push(pathBuilder.edit.content)
  }

  const handleOpen = () => {
    if (qr.qrCodeType.isMap) {
      // 地図URLを新しいタブで開く
      window.open(qrValue, '_blank')
    } else if (qr.qrCodeType.isUrl) {
      // 通常のURLを新しいタブで開く
      window.open(qrValue, '_blank')
    } else if (qr.qrCodeType.isPhone) {
      // 電話番号リンク
      window.location.href = qrValue
    } else if (qr.qrCodeType.isSms) {
      // SMSリンク
      window.location.href = qrValue
    }
    onClose()
  }

  const contentMessage = useMemo(() => {
    if (isDeviceRedirectUrl && deviceRedirectInfo) {
      return locale.message.common.qrInformationDialog.messages.deviceRedirect(
        deviceRedirectInfo.count
      )
    }
    return locale.message.common.qrInformationDialog.messages.contains(qrValue)
  }, [locale, qrValue, isDeviceRedirectUrl, deviceRedirectInfo])

  const actionButtonLabel = useMemo(() => {
    if (isDeviceRedirectUrl) {
      return locale.message.common.qrInformationDialog.buttons.viewDetails
    }
    if (qr.qrCodeType.isMap) {
      return locale.message.common.qrInformationDialog.buttons.openMap
    }
    if (qr.qrCodeType.isUrl) {
      return locale.message.common.qrInformationDialog.buttons.openUrl
    }
    if (qr.qrCodeType.isPhone) {
      return locale.message.common.qrInformationDialog.buttons.call
    }
    if (qr.qrCodeType.isSms) {
      return locale.message.common.qrInformationDialog.buttons.sendSms
    }
    return null
  }, [qr, locale, isDeviceRedirectUrl])

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
                {locale.message.common.qrInformationDialog.labels.redirectUrls}
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
