import React, { FC, ReactNode, useState } from 'react'

import { OptionalForm } from '@/ui/fragments/form'

import { useWindowSize } from '@/hooks'
import { Box, Stack } from '@/ui/cores'
import { QrDownloadButton, QrConfirmButton } from './internal'
import GeneratedQrCode from '../../qrCode/GeneratedQrCode/GeneratedQrCode'

type Props = {
  children: ReactNode
  onConfirm?: () => Promise<string | undefined>
  onDownload?: () => void
  value: string
  isValid?: boolean
}

export const FormButton = React.forwardRef<HTMLDivElement, Props>(
  ({ children, onConfirm, onDownload, value, isValid }, ref) => {
    const { height, width, isLessLaptop } = useWindowSize()
    const [file, setFile] = useState<File | null>(null)

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
              pb={15}
              px={4}
              sx={{
                height,
                boxSizing: 'border-box',
                overflowY: 'auto',
                width: {
                  lg: 450 // ラップトップ以上の幅
                }
              }}
            >
              {children}
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
              {isLessLaptop && (
                <GeneratedQrCode
                  ref={ref}
                  value={value}
                  file={file}
                  isValid={isValid}
                  showHiddenIcon={true}
                />
              )}
              <Stack
                direction={'row'}
                spacing={2}
                display={'flex'}
                justifyContent={'center'}
                pt={4}
                pb={2}
              >
                <QrConfirmButton onClick={onConfirm} />
                <QrDownloadButton onClick={onDownload} />
              </Stack>
            </Stack>
          </Box>
          {!isLessLaptop && (
            <Stack sx={{ pb: 4 }}>
              <GeneratedQrCode
                ref={ref}
                value={value}
                file={file}
                isValid={isValid}
              />
            </Stack>
          )}
        </Stack>
      </Box>
    )
  }
)
