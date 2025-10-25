import { appName } from '@/locales/config/constants'
import { Metadata } from 'next'

const DESCRIPTION =
  'QRコードを編集・カスタマイズして高度なオプションと設定を追加できます。'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - QRコード編集`,
  description: DESCRIPTION,
  keywords: '編集, qrコード, カスタマイズ, 設定, オプション, 高度',
  openGraph: {
    title: `${appName} - QRコード編集`,
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
