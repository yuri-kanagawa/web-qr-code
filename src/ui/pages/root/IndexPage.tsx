'use client'

import { PageWrapper } from '@/ui/cores/pageWrapper'

import { useUrlQRCodeForm } from '@/ui/pages/root/hooks/useUrlQRCodeForm'
import { useState } from 'react'
import { ResponsiveSwitcher } from './internal'
import { Box } from '@mui/material'
import { useQrcode } from '@/hooks'

export const IndexPage = () => {
  const { control, onSubmit, ref } = useUrlQRCodeForm()

  const { setFile, file } = useQrcode()
  return (
    <PageWrapper>
      <ResponsiveSwitcher
        control={control}
        setFile={setFile}
        file={file}
        ref={ref}
      />
    </PageWrapper>
  )
}
