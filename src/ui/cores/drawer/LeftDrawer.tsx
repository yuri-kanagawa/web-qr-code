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

import { DrawerItems } from './ResponsiveSwitcher/Common/DrawerItems'
import { useDisclosure } from '@/hooks/useDisclosure'
import { ResponsiveSwitcher } from '@/ui/cores/drawer/ResponsiveSwitcher/ResponsiveSwitcher'
import { useWindowSize } from '@/hooks'

type Props = {}

export const LeftDrawer = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  const { isOverLaptop } = useWindowSize()
  const { isOpen, toggleOpen, setIsOpen } = useDisclosure()
  useEffect(() => {
    if (isOverLaptop) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [isOverLaptop, setIsOpen])
  return (
    <Drawer
      variant="permanent"
      sx={{
        [`& .MuiDrawer-paper`]: {
          boxSizing: 'border-box'
        }
      }}
    >
      <Box
        ref={ref}
        sx={{
          overflow: 'auto',
          height: '100%'
        }}
      >
        <ResponsiveSwitcher isOpen={isOpen} toggleOpen={toggleOpen} />
      </Box>
    </Drawer>
  )
})
