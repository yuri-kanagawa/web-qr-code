import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION = '件名と本文を含むメールアドレスのQRコードを生成します。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - メール QRコード生成`,
  description: DESCRIPTION,
  keywords: 'メール, QRコード, 件名, 本文, メッセージ',
  openGraph: {
    title: `${appName} - メール QRコード生成`,
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
