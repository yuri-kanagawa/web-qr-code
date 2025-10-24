'use client'

import { Backdrop, Box } from '@mui/material'

import React from 'react'

import { Language } from '@/domains/valueObjects/language'
import { useWindowSize } from '@/hooks'
import { useSidebar } from '@/stores'
import { Footer } from '@/ui/fragments/footer'
import { LeftDrawer } from './internal/drawer'
import { Header } from './internal/header/Header'

type Props = {
  language: Language
  children: React.ReactNode
}

export const PageWrapper = ({ language, children }: Props) => {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
  const { isLessTablet, isOverLaptop, isLessLaptop } = useWindowSize()

  // サイドバーの幅に応じてマージンを計算
  const leftMargin = isLessTablet ? 0 : isSidebarOpen ? 210 : 70

  // laptop以上の場合はfooterを固定表示
  const isFooterFixed = isOverLaptop

  return (
    <>
      {/* モバイル版のヘッダー */}
      {isLessLaptop && <Header language={language} />}
      
      {/* モバイル版のサイドバーバックドロップ */}
      {isSidebarOpen && isLessTablet && (
        <Backdrop
          open={isSidebarOpen}
          onClick={toggleSidebar}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer - 1,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh'
          }}
        />
      )}
      
      <Box display={'flex'} minHeight="100vh">
        {/* サイドバー - 全デバイスで表示 */}
        <LeftDrawer language={language} />

        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          sx={{
            ml: isLessLaptop ? 0 : `${leftMargin}px`,
            pt: isLessLaptop ? '64px' : 0, // ヘッダーの高さ分のパディング
            transition: isLessLaptop ? 'none' : 'margin-left 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            pb: isFooterFixed ? '50px' : 0
          }}
        >
          <Box flex={1}>
            <>{children}</>
          </Box>
          <Footer
            language={language}
            isFixed={isFooterFixed}
            leftMargin={isLessLaptop ? 0 : leftMargin}
          />
        </Box>
      </Box>
    </>
  )
}
