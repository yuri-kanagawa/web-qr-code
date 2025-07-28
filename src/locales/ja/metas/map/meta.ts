import { Metadata } from 'next'
import { appName } from '@/locales/common'

const DESCRIPTION = '緯度・経度座標を使用して地図位置のQRコードを生成します。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - 地図QRコード生成`,
  description: DESCRIPTION,
  keywords: '地図, QRコード, 位置, 座標, 緯度, 経度',
  openGraph: {
    title: `${appName} - 地図QRコード生成`,
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