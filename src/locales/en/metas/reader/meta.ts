import { Metadata } from 'next'
import { appName } from '@/locales/common'

const DESCRIPTION = 'Scan and read QR codes with your device camera.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - QR Code Reader`,
  description: DESCRIPTION,
  keywords: 'qr reader, qr scanner, scan, camera, read qr code',
  openGraph: {
    title: `${appName} - QR Code Reader`,
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