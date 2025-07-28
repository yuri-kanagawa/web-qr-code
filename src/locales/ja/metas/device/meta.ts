import { Metadata } from 'next'
import { appName } from '@/locales/common'

const DESCRIPTION = 'デバイス情報と設定のQRコードを生成します。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - デバイス QRコード生成`,
  description: DESCRIPTION,
  keywords: 'デバイス, QRコード, 設定, 情報, モバイル, タブレット',
  openGraph: {
    title: `${appName} - デバイス QRコード生成`,
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