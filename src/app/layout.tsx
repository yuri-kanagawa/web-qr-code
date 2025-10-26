import { Inter } from 'next/font/google'
import React from 'react'

// フォントの最適化設定
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // フォントの表示最適化
  preload: true,
  fallback: ['system-ui', 'arial']
})

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
        {/* リソースヒントの最適化 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* クリティカルCSSのインライン化 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              background: white;
              width: 100%;
              height: 100%;
              padding: 0;
              margin: 0;
              font-family: ${inter.style.fontFamily};
            }
            /* 初期レンダリング用の最小限のスタイル */
            * {
              box-sizing: border-box;
            }
            /* フォント読み込み中の表示最適化 */
            @font-face {
              font-family: 'Inter';
              font-display: swap;
            }
          `
        }} />
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
      <body className={inter.className}>
        <StateWrap>{children}</StateWrap>
      </body>
    </html>
  )
}
