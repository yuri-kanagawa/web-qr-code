import { Box, Button, Stack } from '@mui/material'

import GeneratedQrcode from '@/ui/cores/qrcode/GeneratedQrcode/GeneratedQrcode'

import React, { FC, useMemo } from 'react'

import { UrlForm } from '@/ui/pages/Url/_internal/Common/UrlForm'
import { useSearchParams } from 'next/navigation'
import { Props } from '../type'
import { QrConfirmButton, QrDownloadButton } from '@/ui/cores/button'
import { useFormState } from 'react-hook-form'
import { useWindowSize } from '@/hooks'
import { OptionalForm } from '@/ui/fragments/form'

export const Desktop = React.forwardRef<HTMLDivElement, Props>(
  ({ control, setFile, file, onDownload, onConfirm }, ref) => {
    const searchParams = useSearchParams()
    const url = searchParams.get('url') ?? ''
    const { isValid } = useFormState({ control })
    const { height, width } = useWindowSize()
    return (
      <Box
        sx={{
          height: '100vh', // 画面全体の高さを固定
          overflow: 'hidden' // 親要素でスクロールを無効化
        }}
      >
        <Stack direction={'row'} spacing={10}>
          <Box>
            <Stack
              spacing={4}
              pt={3}
              pb={10}
              px={4}
              sx={{
                height,
                boxSizing: 'border-box',
                overflowY: 'auto',
                width: {
                  xs: width / 3 - 30, // スマホ～タブレット未満の幅
                  lg: 450 // ラップトップ以上の幅
                }
              }}
            >
              <UrlForm file={file} setFile={setFile} control={control} />
              <OptionalForm file={file} setFile={setFile} />
            </Stack>
            <Stack
              sx={{
                position: 'sticky',
                bottom: 0,
                backgroundColor: 'white',
                zIndex: 1
              }}
            >
              <Stack
                direction={'row'}
                spacing={2}
                display={'flex'}
                justifyContent={'center'}
                pt={4}
                pb={2}
              >
                <QrConfirmButton onClick={onConfirm} isValid={isValid} />
                <QrDownloadButton onClick={onDownload} isValid={isValid} />
              </Stack>
            </Stack>
          </Box>
          <Stack sx={{ pb: 4 }}>
            <GeneratedQrcode
              ref={ref}
              value={url}
              file={file}
              isValid={isValid}
            />
          </Stack>
        </Stack>
      </Box>
    )
  }
)
