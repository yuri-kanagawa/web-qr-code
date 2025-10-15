'use client'
import {
  Backdrop,
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import { FC, forwardRef, ReactNode, useEffect, useState } from 'react'

import { DrawerItems } from './internal'
import { useDisclosure } from '@/hooks/useDisclosure'

import { useWindowSize } from '@/hooks'

import { Tablet } from '@mui/icons-material'
import { useSidebar } from '@/stores'
import { Language } from '@/domains/valueObjects/language'

type Props = {
  language: Language
  children?: React.ReactNode // childrenプロパティを追加
}

export const LeftDrawer = forwardRef<HTMLDivElement, Props>(
  ({ language, children }, ref) => {
    // childrenを引数に追加
    const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
    return (
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        <Box
          component="nav"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: isSidebarOpen ? 210 : 70,
            zIndex: (theme) => theme.zIndex.drawer,
            transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            backgroundColor: 'grey.100',
            height: '100vh',
            willChange: 'width',
            borderRight: '1px solid',
            borderColor: 'grey.200',
            flexShrink: 0
          }}
        >
          <DrawerItems ref={ref} language={language} />
        </Box>
        <Box
          sx={{
            width: isSidebarOpen ? 210 : 70,
            flexShrink: 0
          }}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: '100vh',
            position: 'relative'
          }}
        >
          {children}
        </Box>
      </Box>
    )
  }
)
