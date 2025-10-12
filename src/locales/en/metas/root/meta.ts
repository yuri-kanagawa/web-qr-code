import { Metadata } from 'next'
import { appName } from '@/locales/config/constants'
const DESCRIPTION = 'Your site description here.'
const OGP_IMAGE_URL = '/opengraph-image.png' // public配下に画像がある前提

const meta: Metadata = {
  title: appName,
  description: DESCRIPTION,
  openGraph: {
    title:appName,
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