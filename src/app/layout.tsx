import { Inter } from 'next/font/google'
import React from 'react'
import { headers } from 'next/headers'
import { en } from '@/locales/en'
const inter = Inter({ subsets: ['latin'] })

import { StateWrap } from '@/app/_state'
export const metadata = en.meta.index

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || 'en'
  const lang = acceptLanguage.split(',')[0]
  return (
    <html lang={lang}>
      <head></head>
      <body
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          padding: 0,
          margin: 0
        }}
      >
        <StateWrap>{children}</StateWrap>
      </body>
    </html>
  )
}
