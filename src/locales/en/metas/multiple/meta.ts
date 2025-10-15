import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION =
  'Generate multiple QR codes at once for different types of content.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Multiple QR Code Generator`,
  description: DESCRIPTION,
  keywords: 'multiple, qr code, batch, generator, bulk',
  openGraph: {
    title: `${appName} - Multiple QR Code Generator`,
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
