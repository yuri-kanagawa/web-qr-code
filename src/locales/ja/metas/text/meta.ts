import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION =
  'プレーンテキストコンテンツとメッセージのQRコードを生成します。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - テキスト QRコード生成`,
  description: DESCRIPTION,
  keywords: 'テキスト, QRコード, メッセージ, プレーンテキスト, コンテンツ',
  openGraph: {
    title: `${appName} - テキスト QRコード生成`,
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
