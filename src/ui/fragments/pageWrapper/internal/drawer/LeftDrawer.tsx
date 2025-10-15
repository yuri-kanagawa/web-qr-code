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
}

export const LeftDrawer = forwardRef<HTMLDivElement, Props>(
  ({ language }, ref) => {
    const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
    return (
      <>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: isSidebarOpen ? 210 : 70,
            zIndex: (theme) => theme.zIndex.drawer,
            transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'none', // transformを削除してインジケーターが確実に見えるように
            display: 'flex',
            backgroundColor: 'grey.100',
            height: '100vh',
            willChange: 'width',
            borderRight: '1px solid',
            borderColor: 'grey.200',
            '& > *': {
              width: '100%'
            }
          }}
        >
          <DrawerItems ref={ref} language={language} />
        </Box>
      </>
    )
  }
)
