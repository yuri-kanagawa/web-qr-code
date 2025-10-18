import { Inter } from 'next/font/google'
import React from 'react'
const inter = Inter({ subsets: ['latin'] })

import { StateWrap } from '@/app/_state'
import { Language } from '@/domains'
export const metadata = Language.default().locale.meta.index

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // URLから言語を検出してlang属性を更新
              (function() {
                const path = window.location.pathname;
                const lang = path.startsWith('/ja') ? 'ja' : 'en';
                document.documentElement.lang = lang;
              })();
            `
          }}
        />
      </head>
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
