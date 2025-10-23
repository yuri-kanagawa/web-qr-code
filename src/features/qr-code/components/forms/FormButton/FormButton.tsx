import { FC, ReactNode } from 'react'

import { OptionalForm } from '@/features/qr-code'
import { FormCard } from '@/ui/fragments'

import { QrCode } from '@/domains'
import {
  ConfirmButton,
  DownloadButton,
  GeneratedQrCode
} from '@/features/qr-code'
import { useWindowSize } from '@/hooks'
import { Box, Stack } from '@/ui/cores'

type Props = {
  children: ReactNode
  qr: QrCode
  onChange: (qr: QrCode) => void
  isValid?: boolean
}

export const FormButton: FC<Props> = ({
  children,
  qr,
  onChange,
  isValid = true
}: Props) => {
  const { height, width, isLessLaptop, isOverLaptop } = useWindowSize()

  // QRコードが生成可能かチェック
  const canGenerate =
    isValid &&
    qr.isValid() &&
    qr.qrValue.value !== '' &&
    qr.qrValue.value.trim() !== ''

  return (
    <Box
      sx={{
        height: '100vh', // 画面全体の高さを固定
        overflow: 'hidden' // 親要素でスクロールを無効化
      }}
    >
      <Stack direction={'row'} spacing={10}>
        <Box sx={{ position: 'relative' }}>
          {/* スクロール可能なコンテンツエリア */}
          <Stack
            spacing={4}
            pt={3}
            pb={2}
            px={4}
            sx={{
              height: `calc(${height}px - 100px)`, // ボタンエリアの高さ分を引く
              boxSizing: 'border-box',
              overflowY: 'auto',
              width: {
                lg: 450 // ラップトップ以上の幅
              }
            }}
          >
            {children}
            <FormCard cardProps={{ sx: { p: 2 } }}>
              <OptionalForm qr={qr} onChange={onChange} />
            </FormCard>
          </Stack>

          {/* 固定ボタンエリア */}
          <Stack
            sx={{
              position: 'sticky',
              bottom: 0,
              backgroundColor: 'white',
              zIndex: 1
            }}
          >
            <GeneratedQrCode
              isValid={canGenerate}
              showHiddenIcon={true}
              height={50}
              width={50}
              qr={qr}
            />
            <Stack
              direction={'row'}
              spacing={2}
              display={'flex'}
              justifyContent={'center'}
              pt={4}
              pb={isOverLaptop ? 8 : 2}
            >
              <ConfirmButton qr={qr} isValid={canGenerate} />
              <DownloadButton qr={qr} isValid={canGenerate} />
            </Stack>
          </Stack>
        </Box>
        {/* {isOverLaptop && (
            <Box
              sx={{ p: 2, height: 'calc(100vh - 100px)', overflow: 'hidden' }}
            >
              <FormCard
                cardProps={{
                  sx: {
                    height: '250px',
                    width: '250px',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  },
                  elevation: 4
                }}
              >
                <GeneratedQrCode
                  ref={qrRef}
                  qr={qr}
                  file={qr.settings.logoFile}
                  isValid={canGenerate}
                  height={200}
                  width={200}
                />
              </FormCard>
            </Box>
          )} */}
      </Stack>
    </Box>
  )
}
