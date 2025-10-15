import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION =
  'SSIDとパスワードを使用してWiFiネットワーク接続のQRコードを生成します。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - WiFi QRコード生成`,
  description: DESCRIPTION,
  keywords: 'WiFi, QRコード, ネットワーク, SSID, パスワード, 接続',
  openGraph: {
    title: `${appName} - WiFi QRコード生成`,
    description: DESCRIPTION,
    images: [
      {
        url: OGP_IMAGE_URL,
        width: 1200,
        height: 630
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: OGP_IMAGE_URL,
        width: 1200,
        height: 630
      }
    ]
  }
}

export default meta
