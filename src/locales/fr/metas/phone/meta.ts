import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION =
  'Generate QR codes for phone numbers to make calling easier.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Phone QR Code Generator`,
  description: DESCRIPTION,
  keywords: 'phone, qr code, call, telephone, number, dial',
  openGraph: {
    title: `${appName} - Phone QR Code Generator`,
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
