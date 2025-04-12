'use client'

import { Backdrop, Box, Collapse, Stack } from '@mui/material'
import { useDisclosure } from '@/hooks/useDisclosure'

import { useComponentSize } from '@/hooks/useComponentSize'
import React, { useMemo } from 'react'

import { LeftDrawer } from './internal/drawer'
import { useSidebar } from '@/stores'
import { useWindowSize } from '@/hooks'

type Props = {
  children: React.ReactNode
}

export const PageWrapper = ({ children }: Props) => {
  const { ref, width } = useComponentSize()
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar()
  const { isLessTablet } = useWindowSize()
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
        <LeftDrawer />

        <Box
          flex={1}
          display="flex"
          sx={{
            pl: 5
            // transition: (theme) =>
            //   theme.transitions.create('padding-left', {
            //     duration: theme.transitions.duration.shortest,
            //     easing: theme.transitions.easing.easeInOut
            //   })
          }}
        >
          <>{children}</>
        </Box>
      </Box>
    </>
  )
}
