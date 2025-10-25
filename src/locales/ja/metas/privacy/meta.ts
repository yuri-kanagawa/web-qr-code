import { appName } from '@/locales/config/constants'
import { Metadata } from 'next'

const DESCRIPTION = 'QRコードジェネレーターサービスのプライバシーポリシーです。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - プライバシーポリシー`,
  description: DESCRIPTION,
  keywords: 'プライバシー, ポリシー, qrコード, ジェネレーター, サービス',
  openGraph: {
    title: `${appName} - プライバシーポリシー`,
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
