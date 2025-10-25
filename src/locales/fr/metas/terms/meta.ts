import { appName } from '@/locales/config/constants'
import { Metadata } from 'next'

const DESCRIPTION =
  "Conditions d'utilisation pour notre service de générateur de QR code."
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Conditions d'Utilisation`,
  description: DESCRIPTION,
  keywords: 'conditions, utilisation, qr code, générateur, accord',
  openGraph: {
    title: `${appName} - Conditions d'Utilisation`,
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
