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
  return (
    <Drawer
      variant="permanent"
      sx={{
        [`& .MuiDrawer-paper`]: {
          boxSizing: 'border-box'
        }
      }}
    >
      <DrawerItems ref={ref} />
    </Drawer>
  )
})
