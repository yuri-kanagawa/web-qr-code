import { Metadata } from 'next'
import { appName } from '@/locales/common'

const DESCRIPTION = 'ソーシャルメディアのプロフィールや投稿のQRコードを生成します。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - ソーシャルメディア QRコード生成`,
  description: DESCRIPTION,
  keywords: 'ソーシャルメディア, QRコード, Instagram, Twitter, Facebook, LinkedIn',
  openGraph: {
    title: `${appName} - ソーシャルメディア QRコード生成`,
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