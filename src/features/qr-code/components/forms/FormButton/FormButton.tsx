import { FC, ReactNode, useRef } from 'react'

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
  const qrRef = useRef<HTMLDivElement>(null)

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
      <Stack direction={isOverLaptop ? 'row' : 'column'} spacing={isOverLaptop ? 4 : 0}>
        {/* 必須入力フォームエリア */}
        <Box sx={{ position: 'relative', flex: isOverLaptop ? '0 0 400px' : '1' }}>
          <Stack
            spacing={4}
            pt={3}
            pb={2}
            px={4}
            sx={{
              height: isOverLaptop ? `calc(${height}px - 100px)` : 'auto',
              boxSizing: 'border-box',
              overflowY: isOverLaptop ? 'auto' : 'visible',
              width: {
                lg: 400
              }
            }}
          >
            {children}
          </Stack>
        </Box>

        {/* オプション入力フォームエリア - デスクトップ版のみ表示 */}
        {isOverLaptop && (
          <Box sx={{ flex: '0 0 400px' }}>
            <Stack
              spacing={4}
              pt={3}
              pb={2}
              px={4}
              sx={{
                height: `calc(${height}px - 100px)`,
                boxSizing: 'border-box',
                overflowY: 'auto',
                width: 400
              }}
            >
              <FormCard cardProps={{ sx: { p: 2 } }}>
                <OptionalForm qr={qr} onChange={onChange} />
              </FormCard>
            </Stack>
          </Box>
        )}

        {/* モバイル版のオプションフォーム */}
        {!isOverLaptop && (
          <Box sx={{ position: 'relative' }}>
            <Stack
              spacing={4}
              pt={3}
              pb={2}
              px={4}
              sx={{
                height: 'auto',
                boxSizing: 'border-box',
                overflowY: 'visible'
              }}
            >
              <FormCard cardProps={{ sx: { p: 2 } }}>
                <OptionalForm qr={qr} onChange={onChange} />
              </FormCard>
            </Stack>
          </Box>
        )}

        {/* 固定ボタンエリア - モバイル版のみ表示 */}
        {!isOverLaptop && (
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
              pb={2}
            >
              <ConfirmButton qr={qr} isValid={canGenerate} />
              <DownloadButton qr={qr} isValid={canGenerate} />
            </Stack>
          </Stack>
        )}

        {/* QRコードプレビューエリア - デスクトップ版のみ表示 */}
        {isOverLaptop && (
          <Box
            sx={{ 
              p: 2, 
              height: 'calc(100vh - 100px)', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            {/* QRコードプレビューエリア */}
            <FormCard
              cardProps={{
                sx: {
                  height: '300px',
                  width: '300px',
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1
                },
                elevation: 4
              }}
            >
              <GeneratedQrCode
                ref={qrRef}
                qr={qr}
                file={qr.settings.logoFile}
                isValid={canGenerate}
                height={250}
                width={250}
              />
            </FormCard>
            
            {/* アクションボタンエリア */}
            <Stack
              direction={'column'}
              spacing={2}
              sx={{ width: '300px' }}
            >
              <ConfirmButton qr={qr} isValid={canGenerate} />
              <DownloadButton qr={qr} isValid={canGenerate} />
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  )
}