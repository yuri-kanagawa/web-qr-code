import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION = 'Generate QR codes for contact information and business cards.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Contact QR Code Generator`,
  description: DESCRIPTION,
  keywords: 'contact, qr code, business card, vcard, phone, email, address',
  openGraph: {
    title: `${appName} - Contact QR Code Generator`,
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