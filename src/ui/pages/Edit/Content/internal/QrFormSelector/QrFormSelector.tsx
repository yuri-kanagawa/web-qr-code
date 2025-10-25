import { Language } from '@/domains'
import {
  ContactForm,
  DeviceForm,
  EmailForm,
  MapForm,
  PhoneForm,
  SmsForm,
  TextForm,
  UrlForm,
  WiFiForm
} from '@/features/qr-code'
import { useQr } from '@/stores'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'

interface Props {
  language: Language
}

export const QrFormSelector: FC<Props> = ({ language }) => {
  const { qr, setQr } = useQr()
  const router = useRouter()

  // QRデータがない場合は編集ページにリダイレクト
  useEffect(() => {
    if (!qr) {
      router.push(language.isEnglish ? '/edit' : `/${language.value}/edit`)
    }
  }, [qr, router, language])

  // QRの種類に応じてフォームを選択
  const formContent = useMemo(() => {
    if (!qr) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh'
          }}
        >
          <Typography variant="body1" color="text.secondary">
            {language.isEnglish
              ? 'Loading QR Code data...'
              : 'QRコードデータを読み込み中...'}
          </Typography>
        </Box>
      )
    }

    // QRコードの種類に応じてフォームを返す
    if (qr.qrCodeType.isEmail) {
      return <EmailForm qr={qr} onChange={setQr} />
    }

    if (qr.qrCodeType.isSms) {
      return <SmsForm qr={qr} onChange={setQr} />
    }

    if (qr.qrCodeType.isPhone) {
      return <PhoneForm qr={qr} onChange={setQr} />
    }

    if (qr.qrCodeType.isMap) {
      return <MapForm qr={qr} onChange={setQr} />
    }

    if (qr.qrCodeType.isWifi) {
      return <WiFiForm qr={qr} onChange={setQr} />
    }

    if (qr.qrCodeType.isContact) {
      return <ContactForm qr={qr} onChange={setQr} />
    }

    if (qr.qrCodeType.isDevice) {
      return <DeviceForm qr={qr} onChange={setQr} />
    }

    if (qr.qrCodeType.isUrl) {
      return <UrlForm qr={qr} onChange={setQr} />
    }

    // その他のテキスト
    return <TextForm qr={qr} onChange={setQr} />
  }, [qr, setQr])

  return <>{formContent}</>
}
