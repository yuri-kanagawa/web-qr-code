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

  const locale = qr.language.locale
  return (
    <Box
      sx={{
        height: '100%', // 親要素の高さに合わせる
        overflow: 'hidden' // 親要素でスクロールを無効化
      }}
    >
      <Stack
        direction={isOverLaptop ? 'row' : 'column'}
        spacing={isOverLaptop ? 4 : 0}
        sx={{
          height: '100%',
          overflow: isOverLaptop ? 'hidden' : 'visible'
        }}
      >
        {/* 必須入力フォームエリア */}
        <Box
          sx={{
            position: 'relative',
            flex: isOverLaptop ? '0 0 400px' : '1',
            height: isOverLaptop ? '100%' : 'auto',
            overflow: 'hidden'
          }}
        >
          <Stack
            spacing={4}
            pt={3}
            pb={2}
            px={4}
            sx={{
              height: isOverLaptop ? '100%' : 'auto',
              boxSizing: 'border-box',
              overflowY: isOverLaptop ? 'auto' : 'visible',
              width: {
                lg: 400
              },
              '&::-webkit-scrollbar': {
                width: '8px'
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)'
                }
              }
            }}
          >
            {children}
          </Stack>
        </Box>

        {/* オプション入力フォームエリア - デスクトップ版のみ表示 */}
        {isOverLaptop && (
          <Box
            sx={{
              flex: '0 0 400px',
              height: '100%',
              overflow: 'visible'
            }}
          >
            <Box sx={{ position: 'relative', height: '100%' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: -10,
                  left: 10,
                  backgroundColor: 'background.paper',
                  px: 0.5,
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                  zIndex: 2
                }}
              >
                {locale.word.formSections.optionalSettings}
              </Box>
              <FormCard
                cardProps={{
                  sx: {
                    mt: 2,
                    pt: 4,
                    pb: 2,
                    px: 0,
                    overflowY: 'auto',
                    height: 'calc(100vh - 200px)',
                    position: 'relative',
                    bgcolor: 'background.paper',
                    boxShadow: 2,
                    borderRadius: 2,
                    overflowX: 'visible',
                    '&::-webkit-scrollbar': {
                      width: '8px'
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '4px',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)'
                      }
                    }
                  }
                }}
              >
                <Box sx={{ px: 2 }}>
                  <OptionalForm qr={qr} onChange={onChange} />
                </Box>
              </FormCard>
            </Box>
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
              height: '100%',
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
                  width: '300px',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2
                },
                elevation: 4
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '250px'
                }}
              >
                <GeneratedQrCode
                  ref={qrRef}
                  qr={qr}
                  isValid={canGenerate}
                  height={250}
                  width={250}
                />
              </Box>

              {/* アクションボタンエリア */}
              <Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
                <ConfirmButton qr={qr} isValid={canGenerate} />
                <DownloadButton qr={qr} isValid={canGenerate} />
              </Stack>
            </FormCard>
          </Box>
        )}
      </Stack>
    </Box>
  )
}
