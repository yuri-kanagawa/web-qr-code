'use client'

import { Backdrop, Box } from '@mui/material'

import { useComponentSize } from '@/hooks/useComponentSize'
import React from 'react'

import { Language } from '@/domains/valueObjects/language'
import { useWindowSize } from '@/hooks'
import { useSidebar } from '@/stores'
import { LeftDrawer } from './internal/drawer'

type Props = {
  language: Language
  children: React.ReactNode
}

export const PageWrapper = ({ language, children }: Props) => {
  const { ref, width } = useComponentSize()
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
  const { isLessTablet } = useWindowSize()

  // サイドバーの幅に応じてマージンを計算
  const leftMargin = isLessTablet ? 0 : isSidebarOpen ? 210 : 70

  return (
    <>
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
      <Box display={'flex'}>
        <LeftDrawer language={language} />

        <Box
          flex={1}
          display="flex"
          sx={{
            ml: `${leftMargin}px`,
            transition: 'margin-left 200ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <>{children}</>
        </Box>
      </Box>
    </>
  )
}
