import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION = 'Generate QR codes for social media profiles and posts.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Social Media QR Code Generator`,
  description: DESCRIPTION,
  keywords: 'social media, qr code, instagram, twitter, facebook, linkedin',
  openGraph: {
    title: `${appName} - Social Media QR Code Generator`,
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