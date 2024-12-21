'use client'
import {
  Box,
  Button,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import { useState } from 'react'

import { DrawerItems } from './DrawerItems'

export const LeftDrawer = () => {
  // const onClick = () => setOpen(open!)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <Drawer
      variant="permanent"
      sx={{
        // width: width,
        // display: 'flex',
        // flexShrink: 0,
        [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' }
      }}
    >
      <Box sx={{ overflow: 'auto', height: '100%' }}>
        <DrawerItems isOpen={isOpen} setIsOpen={handleToggle} />
      </Box>
    </Drawer>
  )
}
