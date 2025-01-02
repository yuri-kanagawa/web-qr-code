import { useWindowSize } from '@/hooks'
import { PageWrapper } from '@/ui/cores/pageWrapper'
import { Box, Button, Stack, TextField } from '@mui/material'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { OptionalForm } from '@/ui/fragments/form'
import GeneratedQrcode from '@/ui/cores/qrcode/GeneratedQrcode/GeneratedQrcode'
import QrCheckButton from '../../../../../cores/button/QrCheckButton'
import QrDownloadButton from '@/ui/cores/button/QrDownloadButton'
import { HeightSlider, WidthSlider } from '@/ui/cores/slider'
import { QrFloatingActionButton } from '@/ui/fragments/floatingActionButton'
import React, { FC } from 'react'
import { usePathQueryParameter } from '@/ui/pages/root/hooks/usePathQueryParameter'
import { RegisterQrCodeUrlSchema } from '@/ui/pages/root/hooks'
import { Props } from '../ResponsiveSwitcher'
import { UrlForm } from '@/ui/pages/root/internal/ResponsiveSwitcher/Common/UrlForm'

export const Desktop = React.forwardRef<HTMLDivElement, Props>(
  ({ control, setFile, file }, ref) => {
    const { url } = usePathQueryParameter()
    return (
      <>
        <Box>
          <Stack direction={'row'} spacing={10}>
            <UrlForm file={file} setFile={setFile} control={control} />
            <Box>
              <GeneratedQrcode ref={ref} value={url} file={file} />
            </Box>
            <Box>
              <QrCheckButton ref={ref} />
              <Button type={'submit'}>Generate</Button>
              <QrDownloadButton ref={ref} />
            </Box>
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
      </>
    )
  }
)
