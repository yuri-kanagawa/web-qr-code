import { appName } from '@/locales/config/constants'
import { Metadata } from 'next'

const DESCRIPTION =
  'Modifiez et personnalisez votre QR code avec des options et paramètres avancés.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Modifier QR Code`,
  description: DESCRIPTION,
  keywords: 'modifier, qr code, personnaliser, paramètres, options, avancé',
  openGraph: {
    title: `${appName} - Modifier QR Code`,
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
