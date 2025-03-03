'use client'
import { LeftDrawer } from '@/ui/cores/drawer'
import { Backdrop, Box, Collapse, Stack } from '@mui/material'
import { useDisclosure } from '@/hooks/useDisclosure'

import { useComponentSize } from '@/hooks/useComponentSize'
import { useMemo } from 'react'
import { useWindowSize } from '@/hooks'

type Props = {
  children: React.ReactNode
}

export const PageWrapper = ({ children }: Props) => {
  const { ref, width } = useComponentSize()
  const pl = useMemo(() => {
    if (width >= 100) {
      return 30
    } else {
      return 10
    }
  }, [width])

  return (
    <>
      <LeftDrawer ref={ref} />
      <Box
        flex={1}
        display={'flex'}
        sx={{
          pl,
          transition: 'padding-left 0.1s ease-in-out'
        }}
      >
        {children}
      </Box>
    </>
  )
}
