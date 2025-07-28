import { Metadata } from 'next'
import { appName } from '@/locales/common'

const DESCRIPTION = 'Generate QR codes for WiFi network connections with SSID and password.'
const OGP_IMAGE_URL = '/opengraph-image.png'

const meta: Metadata = {
  title: `${appName} - WiFi QR Code Generator`,
  description: DESCRIPTION,
  keywords: 'wifi, qr code, network, ssid, password, connection',
  openGraph: {
    title: `${appName} - WiFi QR Code Generator`,
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