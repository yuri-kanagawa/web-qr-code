import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION = 'URLやウェブリンクのQRコードを簡単に生成できます。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - URL QRコード生成`,
  description: DESCRIPTION,
  keywords: 'URL, QRコード, リンク, ウェブサイト, 生成',
  openGraph: {
    title: `${appName} - URL QRコード生成`,
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