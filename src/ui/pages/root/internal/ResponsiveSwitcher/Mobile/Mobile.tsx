import { useWindowSize } from '@/hooks'
import { Box, Button, Stack, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { OptionalForm } from '@/ui/fragments/form'
import GeneratedQrcode from '@/ui/cores/qrcode/GeneratedQrcode/GeneratedQrcode'
import QrCheckButton from '@/ui/cores/button/QrCheckButton'
import QrDownloadButton from '@/ui/cores/button/QrDownloadButton'
import { HeightSlider, WidthSlider } from '@/ui/cores/slider'
import { QrFloatingActionButton } from '@/ui/fragments/floatingActionButton'
import React from 'react'
import { usePathQueryParameter } from '@/ui/pages/root/hooks/usePathQueryParameter'

import { Props } from '../ResponsiveSwitcher'
import { UrlForm } from '@/ui/pages/root/internal/ResponsiveSwitcher/Common/UrlForm'

export const Mobile = React.forwardRef<HTMLDivElement, Props>(
  ({ control, setFile, file }, ref) => {
    const { isOverLaptop, height } = useWindowSize()
    const { url } = usePathQueryParameter()
    return (
      <>
        <Box>
          <Stack direction={'row'} spacing={10}>
            <UrlForm file={file} setFile={setFile} control={control} />
          </Stack>
        </Box>
        <Stack spacing={8}>
          <Stack direction={'row'}>
            <HeightSlider width={100} height={100}>
              <></>
            </HeightSlider>
          </Stack>

          <WidthSlider />
        </Stack>
        <QrFloatingActionButton />
      </>
    )
  }
)
