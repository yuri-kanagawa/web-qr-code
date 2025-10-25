import { appName } from '@/locales/config/constants'
import { Metadata } from 'next'

const DESCRIPTION =
  'Politique de confidentialité pour notre service de générateur de QR code.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Politique de Confidentialité`,
  description: DESCRIPTION,
  keywords: 'confidentialité, politique, qr code, générateur, service',
  openGraph: {
    title: `${appName} - Politique de Confidentialité`,
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
