import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Edit QR Code - QR Code Generator',
  description:
    'Edit and customize your QR code with advanced options and settings.',
  openGraph: {
    title: 'Edit QR Code - QR Code Generator',
    description:
      'Edit and customize your QR code with advanced options and settings.',
    type: 'website'
  }
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
