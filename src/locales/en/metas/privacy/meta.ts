import { appName } from '@/locales/config/constants'
import { Metadata } from 'next'

const DESCRIPTION = 'Privacy policy for our QR code generator service.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Privacy Policy`,
  description: DESCRIPTION,
  keywords: 'privacy, policy, qr code, generator, service',
  openGraph: {
    title: `${appName} - Privacy Policy`,
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
