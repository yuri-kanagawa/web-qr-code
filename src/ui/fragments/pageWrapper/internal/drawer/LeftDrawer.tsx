'use client'
import { Box } from '@mui/material'
import { forwardRef } from 'react'

import { DrawerItems } from './internal'

import { Language } from '@/domains/valueObjects/language'
import { useSidebar } from '@/stores'

type Props = {
  language: Language
  children?: React.ReactNode // childrenプロパティを追加
}

export const LeftDrawer = forwardRef<HTMLDivElement, Props>(
  ({ language, children }, ref) => {
    const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
    return (
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isSidebarOpen ? '210px' : '70px',
          height: '100vh',
          backgroundColor: 'grey.100',
          borderRight: '1px solid',
          borderColor: 'grey.200',
          zIndex: (theme) => theme.zIndex.drawer,
          transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <DrawerItems ref={ref} language={language} />
      </Box>
    )
  }
)

LeftDrawer.displayName = 'LeftDrawer'
