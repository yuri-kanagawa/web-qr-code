import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION = '電話番号とテキスト内容を含むSMSメッセージのQRコードを生成します。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - SMS QRコード生成`,
  description: DESCRIPTION,
  keywords: 'SMS, QRコード, テキストメッセージ, 電話, モバイル, メッセージ',
  openGraph: {
    title: `${appName} - SMS QRコード生成`,
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