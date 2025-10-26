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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* クリティカルCSSのインライン化 */}
        <style
          dangerouslySetInnerHTML={{
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
            /* Material-UIの基本スタイルを事前定義 */
            .MuiCssBaseline-root {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            /* よく使われるMaterial-UIコンポーネントの基本スタイル */
            .MuiButton-root {
              box-sizing: border-box;
              font-family: inherit;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              position: relative;
              box-sizing: border-box;
              background-color: transparent;
              outline: 0;
              border: 0;
              margin: 0;
              cursor: pointer;
              user-select: none;
              vertical-align: middle;
              text-decoration: none;
              font-weight: 500;
              font-size: 0.875rem;
              line-height: 1.75;
              letter-spacing: 0.02857em;
              text-transform: uppercase;
              min-width: 64px;
              padding: 6px 16px;
              border-radius: 4px;
              transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            }
            .MuiTextField-root {
              box-sizing: border-box;
              position: relative;
            }
            .MuiContainer-root {
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              width: 100%;
              margin-left: auto;
              margin-right: auto;
              padding-left: 16px;
              padding-right: 16px;
            }
            .MuiInputBase-root {
              color: rgba(0, 0, 0, 0.87);
              cursor: text;
              display: inline-flex;
              position: relative;
              font-size: 1rem;
              box-sizing: border-box;
              align-items: center;
              font-family: inherit;
              font-weight: 400;
              line-height: 1.1876em;
              letter-spacing: 0.00938em;
            }
            .MuiFormControl-root {
              display: inline-flex;
              flex-direction: column;
              position: relative;
              min-width: 0;
              padding: 0;
              margin: 0;
              border: 0;
              vertical-align: top;
            }
            .MuiTypography-root {
              margin: 0;
              font-weight: 400;
              font-size: 1rem;
              line-height: 1.5;
              letter-spacing: 0.00938em;
            }
            .MuiPaper-root {
              color: rgba(0, 0, 0, 0.87);
              transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
              background-color: #fff;
            }
            .MuiAppBar-root {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: row;
              width: 100%;
              box-sizing: border-box;
              flex-shrink: 0;
              flex-direction: column;
              color: #fff;
              background-color: #1976d2;
              box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
            }
            /* レイアウトシフト防止 */
            .MuiAppBar-root {
              position: relative;
            }
            /* よく使われるレイアウトクラス */
            .MuiGrid-root {
              box-sizing: border-box;
              display: flex;
              flex-wrap: wrap;
              width: 100%;
            }
            .MuiBox-root {
              box-sizing: border-box;
            }
            /* アニメーション最適化（初期レンダリング時のみ制限） */
            .initial-load * {
              transition: none !important;
              animation: none !important;
            }
            /* 初期表示時のレンダリング最適化 */
            .MuiSkeleton-root {
              display: block;
              height: 1.2em;
              background-color: rgba(0, 0, 0, 0.11);
              border-radius: 4px;
            }
          `
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // URLから言語を検出してlang属性を更新
              (function() {
                const path = window.location.pathname;
                const lang = path.startsWith('/ja') ? 'ja' : 'en';
                document.documentElement.lang = lang;
              })();
              
              // 積極的なCSS遅延読み込み最適化
              (function() {
                // 非クリティカルCSSの遅延読み込み
                const loadCSS = function(href) {
                  const link = document.createElement('link');
                  link.rel = 'stylesheet';
                  link.href = href;
                  link.media = 'print';
                  link.onload = function() {
                    this.media = 'all';
                  };
                  document.head.appendChild(link);
                };
                
                // ページ読み込み後にCSSを読み込み
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    // 非クリティカルCSSの読み込みを大幅に遅延
                    setTimeout(function() {
                      // Material-UIの非クリティカルCSSを遅延読み込み
                      const styleSheets = document.querySelectorAll('link[rel="stylesheet"]');
                      styleSheets.forEach(function(sheet) {
                        if (sheet.href && sheet.href.includes('mui') && !sheet.media) {
                          sheet.media = 'print';
                          sheet.onload = function() {
                            this.media = 'all';
                          };
                        }
                      });
                    }, 500); // 500ms遅延
                  });
                }
                
                // リソースヒントの最適化
                const preloadCriticalResources = function() {
                  const criticalResources = [
                    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
                  ];
                  
                  criticalResources.forEach(function(href) {
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.as = 'style';
                    link.href = href;
                    link.onload = function() {
                      this.rel = 'stylesheet';
                    };
                    document.head.appendChild(link);
                  });
                };
                
                // 即座にクリティカルリソースをプリロード
                preloadCriticalResources();
                
                // 初期読み込み後にアニメーションを有効化
                const enableAnimations = function() {
                  document.body.classList.remove('initial-load');
                };
                
                // ページ読み込み完了後にアニメーションを有効化
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(enableAnimations, 100);
                  });
                } else {
                  setTimeout(enableAnimations, 100);
                }
              })();
            `
          }}
        />
      </head>
      <body className={`${inter.className} initial-load`}>
        <StateWrap>{children}</StateWrap>
      </body>
    </html>
  )
}
