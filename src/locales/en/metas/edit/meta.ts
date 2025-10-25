import { appName } from '@/locales/config/constants'
import { Metadata } from 'next'

const DESCRIPTION =
  'Edit and customize your QR code with advanced options and settings.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Edit QR Code`,
  description: DESCRIPTION,
  keywords: 'edit, qr code, customize, settings, options, advanced',
  openGraph: {
    title: `${appName} - Edit QR Code`,
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
