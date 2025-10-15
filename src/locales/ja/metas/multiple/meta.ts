import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION =
  '複数の異なるタイプのコンテンツのQRコードを一度に生成します。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - 複数 QRコード生成`,
  description: DESCRIPTION,
  keywords: '複数, QRコード, バッチ, 生成, 一括',
  openGraph: {
    title: `${appName} - 複数 QRコード生成`,
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
