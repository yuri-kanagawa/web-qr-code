import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION = 'Generate QR codes for SMS messages with phone number and text content.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - SMS QR Code Generator`,
  description: DESCRIPTION,
  keywords: 'sms, qr code, text message, phone, mobile, message',
  openGraph: {
    title: `${appName} - SMS QR Code Generator`,
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