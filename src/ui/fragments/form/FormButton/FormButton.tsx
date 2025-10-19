import React, { ReactNode, useState } from 'react'

import { FormCard, OptionalForm } from '@/ui/fragments'

import { Language } from '@/domains/valueObjects/language'
import { useWindowSize } from '@/hooks'
import { Box, Stack } from '@/ui/cores'
import GeneratedQrCode from '../../qrCode/GeneratedQrCode/GeneratedQrCode'
import { QrConfirmButton, QrDownloadButton } from './internal'

type Props = {
  children: ReactNode
  onConfirm?: () => Promise<string | undefined>
  onDownload?: () => void
  value: string
  isValid?: boolean
  language: Language
  settings: QrCode
  onChange: (settings: QrCode) => void
}

export const FormButton = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      onConfirm,
      onDownload,
      value,
      isValid,
      language,
      settings,
      onChange
    },
    ref
  ) => {
    const { height, width, isLessLaptop, isOverLaptop } = useWindowSize()
    const [file, setFile] = useState<File | null>(null)

    // canvasが生成される条件: isValid && value が存在する
    const hasCanvas = isValid && !!value

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
                <OptionalForm
                  file={file}
                  setFile={setFile}
                  language={language}
                  settings={settings}
                  onChange={onChange}
                />
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
              {isLessLaptop && (
                <GeneratedQrCode
                  ref={ref}
                  value={value}
                  file={file}
                  isValid={isValid}
                  showHiddenIcon={true}
                  settings={settings}
                />
              )}
              <Stack
                direction={'row'}
                spacing={2}
                display={'flex'}
                justifyContent={'center'}
                pt={4}
                pb={isOverLaptop ? 8 : 2}
              >
                <QrConfirmButton
                  onClick={onConfirm}
                  language={language}
                  isValid={hasCanvas}
                  settings={settings}
                />
                <QrDownloadButton
                  onClick={onDownload}
                  language={language}
                  isValid={hasCanvas}
                />
              </Stack>
            </Stack>
          </Box>
          {isOverLaptop && (
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
                  ref={ref}
                  settings={settings}
                  value={value}
                  file={file}
                  isValid={isValid}
                  height={200}
                  width={200}
                />
              </FormCard>
            </Box>
          )}
        </Stack>
      </Box>
    )
  }
)

FormButton.displayName = 'FormButton'
