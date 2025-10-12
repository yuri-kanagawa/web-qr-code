import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION = 'Generate QR codes for email addresses with subject and body content.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Email QR Code Generator`,
  description: DESCRIPTION,
  keywords: 'email, qr code, mail, subject, body, message',
  openGraph: {
    title: `${appName} - Email QR Code Generator`,
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