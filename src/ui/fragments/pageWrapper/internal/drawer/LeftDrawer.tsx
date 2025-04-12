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

type Props = {}

export const LeftDrawer = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
  return (
    <>
      <Box
        sx={(theme) => ({
          // width: isSidebarOpen ? 210 : 70,
          zIndex: theme.zIndex.drawer,
          transition: theme.transitions.create('width', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeInOut
          }),
          display: 'flex', // ← これ大事
          backgroundColor: 'grey.100',
          height: '100vh'
        })}
      >
        <DrawerItems ref={ref} />
      </Box>
    </>
  )
})
