import { Metadata } from 'next'
import { appName } from '@/locales/common'

const DESCRIPTION = 'Generate QR codes for device information and settings.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Device QR Code Generator`,
  description: DESCRIPTION,
  keywords: 'device, qr code, settings, information, mobile, tablet',
  openGraph: {
    title: `${appName} - Device QR Code Generator`,
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