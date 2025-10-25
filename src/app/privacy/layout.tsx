import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Privacy Policy - QR Code Generator',
  description: 'Privacy policy for our QR code generator service.',
  openGraph: {
    title: 'Privacy Policy - QR Code Generator',
    description: 'Privacy policy for our QR code generator service.',
    type: 'website'
  }
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
