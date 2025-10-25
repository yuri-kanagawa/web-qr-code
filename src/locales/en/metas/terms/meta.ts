import { appName } from '@/locales/config/constants'
import { Metadata } from 'next'

const DESCRIPTION = 'Terms of service for our QR code generator service.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Terms of Service`,
  description: DESCRIPTION,
  keywords: 'terms, service, qr code, generator, agreement',
  openGraph: {
    title: `${appName} - Terms of Service`,
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
