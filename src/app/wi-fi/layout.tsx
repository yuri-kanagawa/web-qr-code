import React from 'react'

import { en } from '@/locales/en'

export const metadata = en.meta.index
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
