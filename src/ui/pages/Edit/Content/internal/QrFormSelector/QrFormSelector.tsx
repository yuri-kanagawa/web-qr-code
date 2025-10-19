import { Language } from '@/domains'
import { useQr } from '@/stores'
import {
  ContactForm,
  DeviceForm,
  MapForm,
  PhoneForm,
  SmsForm,
  TextForm,
  UrlForm,
  WiFiForm
} from '@/ui/fragments/form/QrForm'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'

interface Props {
  language: Language
}

export const QrFormSelector: FC<Props> = ({ language }) => {
  const { qr } = useQr()
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

    // URLかどうか判定（デバイス振り分けURLを除く）
    const isDeviceRedirectUrl = qr.value.includes('/device/redirect')

    // SMS
    if (qr.isSms) {
      const smsMatch = qr.value.match(/^smsto:([^:?]+)(?::(.*))?/)
      const phoneNumber = smsMatch ? smsMatch[1] : ''
      const body =
        smsMatch && smsMatch[2] ? decodeURIComponent(smsMatch[2]) : ''

      return (
        <SmsForm language={language} phoneNumber={phoneNumber} body={body} />
      )
    }

    // 電話
    if (qr.isTel) {
      const phoneMatch = qr.value.match(/^tel:(.+)/)
      const phoneNumber = phoneMatch ? phoneMatch[1] : ''

      return <PhoneForm language={language} phoneNumber={phoneNumber} />
    }

    // 地図
    if (qr.isMap) {
      // Google Maps URLから緯度経度を抽出
      const coordsMatch = qr.value.match(/q=([-\d.]+),([-\d.]+)/)
      const latitude = coordsMatch ? coordsMatch[1] : ''
      const longitude = coordsMatch ? coordsMatch[2] : ''

      return (
        <MapForm
          language={language}
          latitude={latitude}
          longitude={longitude}
        />
      )
    }

    // WiFi (WIFI:の形式)
    if (qr.value.startsWith('WIFI:')) {
      const ssidMatch = qr.value.match(/S:([^;]+)/)
      const passwordMatch = qr.value.match(/P:([^;]+)/)
      const typeMatch = qr.value.match(/T:([^;]+)/)

      const ssid = ssidMatch ? ssidMatch[1] : ''
      const password = passwordMatch ? passwordMatch[1] : ''
      const encryptionType = typeMatch ? typeMatch[1] : 'WPA'

      return (
        <WiFiForm
          language={language}
          ssid={ssid}
          password={password}
          type={encryptionType}
        />
      )
    }

    // vCard (連絡先)
    if (qr.value.startsWith('BEGIN:VCARD')) {
      // vCardの解析は複雑なので、デフォルト値でフォームを表示
      return (
        <ContactForm
          language={language}
          firstName=""
          lastName=""
          middleName=""
          email=""
          mobilePhone=""
          homePhone=""
          homeAddress=""
          homeUrl=""
          organization=""
          post=""
          workMobile=""
          workPhone=""
          workAddress=""
          workUrl=""
        />
      )
    }

    // デバイス振り分けURL
    if (isDeviceRedirectUrl) {
      return <DeviceForm language={language} />
    }

    // 通常のURL
    if (qr.isUrl) {
      return <UrlForm language={language} url={qr.value} />
    }

    // その他のテキスト
    return <TextForm language={language} text={qr.value} />
  }, [qr, language])

  return <>{formContent}</>
}
