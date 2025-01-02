'use client'
import { LeftDrawer } from '@/ui/cores/drawer'
import { Backdrop, Box, Stack } from '@mui/material'
import { useDisclosure } from '@/hooks/useDisclosure'
import { useEffect, useRef, useState } from 'react'
import { useComponentSize } from '@/hooks/useComponentSize'

type Props = {
  children: React.ReactNode
}

export const PageWrapper = (props: Props) => {
  const { children } = props
  const { ref, width } = useComponentSize()

  return (
    <>
      <LeftDrawer ref={ref} />
      <Box
        flex={1}
        display={'flex'}
        sx={{
          pl: width / 7 // 動的に取得した幅を使用
        }}
      >
        {children}
      </Box>
    </>
  )
}
