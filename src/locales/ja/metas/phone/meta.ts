import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION = '電話番号のQRコードを生成して、簡単に電話をかけられるようにします。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - 電話 QRコード生成`,
  description: DESCRIPTION,
  keywords: '電話, QRコード, 通話, 電話番号, ダイヤル',
  openGraph: {
    title: `${appName} - 電話 QRコード生成`,
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