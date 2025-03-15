import { useQrcode, useWindowSize } from '@/hooks'
import { Box, Button, Stack, TextField } from '@mui/material'

import { QrFloatingActionButton } from '@/ui/fragments/floatingActionButton'
import React from 'react'

import { Props } from '../type'
import { UrlForm } from '@/ui/pages/url/_internal/Common/UrlForm'

export const Mobile = React.forwardRef<HTMLDivElement, Props>(
  ({ control, setFile, file }, ref) => {
    const { url } = useQrcode()
    return (
      <>
        <Box>
          <Stack direction={'row'} spacing={10}>
            <UrlForm file={file} setFile={setFile} control={control} />
          </Stack>
        </Box>

        <QrFloatingActionButton />
      </>
    )
  }
)
