'use client'
import { Box } from '@mui/material'
import { forwardRef } from 'react'

import { DrawerItems } from './internal'

import { Language } from '@/domains/valueObjects/language'
import { useWindowSize } from '@/hooks'
import { useSidebar } from '@/stores'

type Props = {
  language: Language
  children?: React.ReactNode // childrenプロパティを追加
}

export const LeftDrawer = forwardRef<HTMLDivElement, Props>(
  ({ language, children }, ref) => {
    const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
    const { isLessLaptop } = useWindowSize()

    return (
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: isLessLaptop ? '64px' : 0, // モバイル版ではヘッダーの高さ分下げる
          left: 0,
          width: isLessLaptop
            ? isSidebarOpen
              ? '280px'
              : 0
            : isSidebarOpen
              ? '210px'
              : '70px',
          height: isLessLaptop ? 'calc(100vh - 64px)' : '100vh', // モバイル版ではヘッダー分を引く
          backgroundColor: 'grey.100',
          borderRight: '1px solid',
          borderColor: 'grey.200',
          zIndex: (theme) => theme.zIndex.drawer,
          transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: isLessLaptop ? 'hidden' : 'visible'
        }}
      >
        <DrawerItems ref={ref} language={language} />
      </Box>
    )
  }
)

LeftDrawer.displayName = 'LeftDrawer'
