import React, { ReactNode, useCallback, useRef } from 'react'

import { FormCard, OptionalForm } from '@/ui/fragments'

import { ConfirmQrCodeUseCase } from '@/application/usecases/qr/confirmQrCode'
import { DownloadQrCodeUseCase } from '@/application/usecases/qr/downloadQrCode'
import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { useDisclosure, useNotify, useQrCode, useWindowSize } from '@/hooks'
import { QrGeneratorRepository } from '@/infrastructure/repositories/external/qrGenerator'
import { QrScannerRepository } from '@/infrastructure/repositories/external/qrScanner'
import { Box, Stack } from '@/ui/cores'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography
} from '@mui/material'
import GeneratedQrCode from '../../qrCode/GeneratedQrCode/GeneratedQrCode'
import { QrConfirmButton, QrDownloadButton } from './internal'

// QRコードの実行処理
const executeQrCode = (qr: QrCode): void => {
  const qrValue = qr.qrValue.value

  if (!qrValue || qrValue.trim() === '') {
    return
  }

  // vCardの場合は特別処理（vCardファイルをダウンロード）
  if (qr.qrValue.isVcard) {
    downloadVCard(qrValue)
    return
  }

  // URLの場合は、http://やhttps://が付いていない場合は追加
  if (
    qr.qrCodeType.isUrl &&
    !qrValue.startsWith('http://') &&
    !qrValue.startsWith('https://')
  ) {
    window.open(`https://${qrValue}`, '_blank')
    return
  }

  // その他の場合は、QRコードの値をそのままwindow.openで開く
  // (mailto:, sms:, tel:, geo:, https://など、適切な形式で生成済み)
  window.open(qrValue, '_blank')
}

// vCardファイルのダウンロード処理
const downloadVCard = (vcardData: string): void => {
  const blob = new Blob([vcardData], { type: 'text/vcard' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'contact.vcf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

type Props = {
  children: ReactNode
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
  isValid?: boolean
  onConfirm?: () => void
}

export const FormButton = React.forwardRef<HTMLDivElement, Props>(
  ({ children, language, qr, onChange, isValid = true, onConfirm }, ref) => {
    const { height, width, isLessLaptop, isOverLaptop } = useWindowSize()
    const { ref: qrRef } = useQrCode(language)
    const { successNotify, errorNotify, warningNotify } = useNotify()
    const { onOpen, onClose, isOpen } = useDisclosure()

    const canvasRef = useRef<HTMLCanvasElement>(null)

    // RepositoryとUseCaseの初期化
    const qrGeneratorRepository = new QrGeneratorRepository()
    const qrScannerRepository = new QrScannerRepository()

    const downloadQrCodeUseCase = new DownloadQrCodeUseCase(
      qrGeneratorRepository,
      qrScannerRepository,
      language
    )
    const confirmQrCodeUseCase = new ConfirmQrCodeUseCase(
      qrGeneratorRepository,
      qrScannerRepository,
      language
    )

    // サイズチェック関数（警告を表示するが処理は続行）
    const checkSizeAndWarn = useCallback((): void => {
      if (qr.settings.isSizeBelowRecommended()) {
        warningNotify(
          `QRコードのサイズが推奨サイズ（${qr.settings.recommendedSize}）より小さいです。${qr.settings.recommendedSize}以上にしてください。読み取りに失敗する可能性があります。`
        )
      }
    }, [qr.settings, warningNotify])

    // UseCaseを使用したハンドラー
    const handleDownload = useCallback(async () => {
      try {
        console.log('ダウンロード開始...')

        // サイズチェック（警告を表示するが処理は続行）
        checkSizeAndWarn()

        const result = await downloadQrCodeUseCase.execute(qr)
        if (result.isSuccess && result.dataUrl && result.fileName) {
          // ダウンロード実行
          const link = document.createElement('a')
          link.download = result.fileName
          link.href = result.dataUrl
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          console.log('ダウンロード完了:', result.fileName)
          successNotify('QRコードのダウンロードが完了しました！')
        } else {
          console.error('ダウンロードエラー:', result.error)
          errorNotify(
            'ダウンロードに失敗しました: ' +
              (result.error?.message || 'Unknown error')
          )
        }
      } catch (error) {
        console.error('ダウンロードエラー:', error)
        errorNotify(
          'ダウンロードに失敗しました: ' +
            (error instanceof Error ? error.message : 'Unknown error')
        )
      }
    }, [
      qr,
      downloadQrCodeUseCase,
      successNotify,
      errorNotify,
      checkSizeAndWarn
    ])

    const handleConfirm = useCallback(async (): Promise<void> => {
      const result = await confirmQrCodeUseCase.execute(qr)

      if (!result.isSuccess) {
        errorNotify(
          'QRコード生成に失敗しました: ' +
            (result.error?.message || 'Unknown error')
        )
        return
      }

      // ここまで来ている = 成功なので通知を表示
      successNotify('QRコードが正常に生成され、読み取り可能です！')

      // モーダルを開く
      onOpen()
    }, [qr, confirmQrCodeUseCase, successNotify, errorNotify, onOpen])

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
                <OptionalForm language={language} qr={qr} onChange={onChange} />
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
                  ref={qrRef}
                  file={qr.settings.logoFile}
                  isValid={canGenerate}
                  showHiddenIcon={true}
                  qr={qr}
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
                  onClick={handleConfirm}
                  language={language}
                  isValid={canGenerate}
                  qr={qr}
                />
                <QrDownloadButton
                  onClick={handleDownload}
                  language={language}
                  isValid={canGenerate}
                  qr={qr}
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
                  ref={qrRef}
                  qr={qr}
                  file={qr.settings.logoFile}
                  isValid={canGenerate}
                  height={200}
                  width={200}
                />
              </FormCard>
            </Box>
          )}
        </Stack>

        {/* 確認ボタン（isValidがtrueの場合のみ表示） */}
        {isValid && (
          <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={!canGenerate}
            >
              {language.isEnglish ? 'Confirm' : '確認'}
            </Button>
          </Box>
        )}

        {/* モーダル */}
        <Dialog onClose={onClose} open={isOpen}>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              {language.isEnglish ? 'QR Code Content' : 'QRコードの内容'}
            </Typography>
            <Typography>{qr.qrValue.value}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="outlined">
              {language.isEnglish ? 'Close' : '閉じる'}
            </Button>
            <Button
              onClick={() => {
                // カスタムのonConfirmが提供されている場合はそれを使用
                if (onConfirm) {
                  onConfirm()
                } else {
                  // QRコードの実行処理
                  executeQrCode(qr)
                }
                onClose()
              }}
              variant="contained"
              autoFocus
            >
              {language.isEnglish ? 'Execute' : '実行'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  }
)

FormButton.displayName = 'FormButton'
