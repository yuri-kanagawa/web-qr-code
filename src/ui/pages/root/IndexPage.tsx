'use client'

import { PageWrapper } from '@/ui/cores/pageWrapper'

import { useUrlQRCodeForm } from '@/ui/pages/root/hooks/useUrlQRCodeForm'
import { useState } from 'react'
import { ResponsiveSwitcher } from './internal'
import { Box } from '@mui/material'

export const IndexPage = () => {
  const { control, onSubmit, ref } = useUrlQRCodeForm()

  const [file, setFile] = useState<File | null>(null)

  return (
    <PageWrapper>
      <Box component="form" onSubmit={onSubmit}>
        <ResponsiveSwitcher
          control={control}
          setFile={setFile}
          file={file}
          ref={ref}
        />
      </Box>
    </PageWrapper>
  )
}
