import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION = '連絡先情報と名刺のQRコードを生成します。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - 連絡先 QRコード生成`,
  description: DESCRIPTION,
  keywords: '連絡先, QRコード, 名刺, vCard, 電話, メール, 住所',
  openGraph: {
    title: `${appName} - 連絡先 QRコード生成`,
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