import React, { FC, ReactNode, useState } from 'react'

import { OptionalForm } from '@/ui/fragments/form'

import { useWindowSize } from '@/hooks'
import { Box, Stack } from '@/ui/cores'
// import { QrConfirmButton } from '../../button/QrConfirmButton'
// import { QrDownloadButton } from '../../button'
// import GeneratedQrCode from '@/ui/fragments/qrCode/GeneratedQrCode/GeneratedQrCode'

type Props = {
  children: ReactNode
  onConfirm?: () => Promise<string | undefined>
  onDownload?: () => void
  value: string
  isValid?: boolean
}

export const FormButton = React.forwardRef<HTMLDivElement, Props>(
  ({ children, onConfirm, onDownload, value, isValid }, ref) => {
    const { height, width } = useWindowSize()
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
                  xs: width / 3 - 30, // スマホ～タブレット未満の幅
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
              <Stack
                direction={'row'}
                spacing={2}
                display={'flex'}
                justifyContent={'center'}
                pt={4}
                pb={2}
              >
                {/* <QrConfirmButton onClick={onConfirm} />
                <QrDownloadButton onClick={onDownload} /> */}
              </Stack>
            </Stack>
          </Box>
          <Stack sx={{ pb: 4 }}>
            {/* <GeneratedQrCode
              ref={ref}
              value={value}
              file={file}
              isValid={isValid}
            /> */}
          </Stack>
        </Stack>
      </Box>
    )
  }
)
