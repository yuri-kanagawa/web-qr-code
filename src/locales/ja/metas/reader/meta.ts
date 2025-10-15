import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION = 'デバイスのカメラでQRコードをスキャンして読み取ります。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - QRコードリーダー`,
  description: DESCRIPTION,
  keywords: 'QRリーダー, QRスキャナー, スキャン, カメラ, QRコード読み取り',
  openGraph: {
    title: `${appName} - QRコードリーダー`,
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
