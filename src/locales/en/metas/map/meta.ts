import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'

const DESCRIPTION =
  'Generate QR codes for map locations with latitude and longitude coordinates.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - Map QR Code Generator`,
  description: DESCRIPTION,
  keywords: 'map, qr code, location, coordinates, latitude, longitude',
  openGraph: {
    title: `${appName} - Map QR Code Generator`,
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
