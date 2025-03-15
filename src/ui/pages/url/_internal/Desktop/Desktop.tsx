import { useWindowSize } from '@/hooks'
import { PageWrapper } from '../../../../fragments/pageWrapper'
import { Box, Button, Stack, TextField } from '@mui/material'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { OptionalForm } from '@/ui/fragments/form'
import GeneratedQrcode from '@/ui/cores/qrcode/GeneratedQrcode/GeneratedQrcode'
import QrCheckButton from '../../../../cores/button/QrCheckButton'
import QrDownloadButton from '@/ui/cores/button/QrDownloadButton'

import React, { FC, useMemo } from 'react'

import { UrlForm } from '@/ui/pages/url/_internal/Common/UrlForm'
import { useSearchParams } from 'next/navigation'
import { Props } from '../type'

export const Desktop = React.forwardRef<HTMLDivElement, Props>(
  ({ control, setFile, file }, ref) => {
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
              <QrCheckButton ref={ref} />
              {/*<Button type={'submit'}>Generate</Button>*/}
              <QrDownloadButton ref={ref} />
            </Box>
          </Stack>
        </Box>
      </>
    )
  }
)
