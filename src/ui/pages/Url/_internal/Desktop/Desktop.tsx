import { Box, Button, Stack } from '@mui/material'

import GeneratedQrcode from '@/ui/cores/qrcode/GeneratedQrcode/GeneratedQrcode'

import React, { FC, useMemo } from 'react'

import { UrlForm } from '@/ui/pages/Url/_internal/Common/UrlForm'
import { useSearchParams } from 'next/navigation'
import { Props } from '../type'
import { QrConfirmButton, QrDownloadButton } from '@/ui/cores/button'

export const Desktop = React.forwardRef<HTMLDivElement, Props>(
  ({ control, setFile, file, onDownload, onConfirm }, ref) => {
    const searchParams = useSearchParams()
    const url = searchParams.get('url') ?? ''
    return (
      <>
        <Box>
          <Stack direction={'row'} spacing={10}>
            <UrlForm file={file} setFile={setFile} control={control} />
            <Box>
              <GeneratedQrcode ref={ref} value={url} file={file} />
            </Box>
            <Box>
              <QrConfirmButton onClick={onConfirm} />
              {/*<Button type={'submit'}>Generate</Button>*/}
              <QrDownloadButton onClick={onDownload} />
            </Box>
          </Stack>
        </Box>
      </>
    )
  }
)
