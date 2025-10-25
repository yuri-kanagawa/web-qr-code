import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Terms of Service - QR Code Generator',
  description: 'Terms of service for our QR code generator service.',
  openGraph: {
    title: 'Terms of Service - QR Code Generator',
    description: 'Terms of service for our QR code generator service.',
    type: 'website'
  }
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
