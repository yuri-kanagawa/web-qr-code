import { appName } from '@/locales/config/constants'
import { Metadata } from 'next'

const DESCRIPTION = 'QRコードジェネレーターサービスの利用規約です。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - 利用規約`,
  description: DESCRIPTION,
  keywords: '利用規約, qrコード, ジェネレーター, 合意',
  openGraph: {
    title: `${appName} - 利用規約`,
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
