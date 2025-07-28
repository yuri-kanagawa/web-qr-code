import { Metadata } from 'next'
import { appName } from '@/locales/common'

const DESCRIPTION = 'Generate QR codes for plain text content and messages.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Text QR Code Generator`,
  description: DESCRIPTION,
  keywords: 'text, qr code, message, plain text, content',
  openGraph: {
    title: `${appName} - Text QR Code Generator`,
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