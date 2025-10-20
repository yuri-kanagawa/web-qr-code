import React, { ReactNode, useCallback, useRef } from 'react'

import { FormCard, OptionalForm } from '@/ui/fragments'

import { DownloadQrCodeUseCase } from '@/application/usecases/qr/downloadQrCode'
import { GenerateQrCanvasUseCase } from '@/application/usecases/qr/generateQrCanvas'
import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { useNotify, useQrCode, useWindowSize } from '@/hooks'
import { QrGeneratorRepository } from '@/infrastructure/repositories/external/qrGenerator'
import { QrScannerRepository } from '@/infrastructure/repositories/external/qrScanner'
import { Box, Stack } from '@/ui/cores'
import GeneratedQrCode from '../../qrCode/GeneratedQrCode/GeneratedQrCode'
import { QrConfirmButton, QrDownloadButton } from './internal'

type Props = {
  children: ReactNode
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const FormButton = React.forwardRef<HTMLDivElement, Props>(
  ({ children, language, qr, onChange }, ref) => {
    const { height, width, isLessLaptop, isOverLaptop } = useWindowSize()
    const { ref: qrRef } = useQrCode(language)
    const { successNotify, errorNotify, warningNotify } = useNotify()

    const canvasRef = useRef<HTMLCanvasElement>(null)

    // RepositoryとUseCaseの初期化
    const qrGeneratorRepository = new QrGeneratorRepository()
    const qrScannerRepository = new QrScannerRepository()
    const generateQrCanvasUseCase = new GenerateQrCanvasUseCase(
      qrGeneratorRepository
    )
    const downloadQrCodeUseCase = new DownloadQrCodeUseCase(
      qrGeneratorRepository
    )

    // サイズチェック関数（警告が出た場合はtrueを返す）
    const checkSizeAndWarn = useCallback((): boolean => {
      if (qr.settings.isSizeBelowRecommended()) {
        warningNotify(
          `QRコードのサイズが推奨サイズ（${qr.settings.recommendedSize}px）より小さいです。読み取りに失敗する可能性があります。`
        )
        return true // 警告が出た場合はtrueを返す
      } else {
        return false // 警告が出なかった場合はfalseを返す
      }
    }, [qr.settings, warningNotify])

    // UseCaseを使用したハンドラー
    const handleDownload = useCallback(async () => {
      try {
        console.log('ダウンロード開始...')

        // サイズチェック
        if (checkSizeAndWarn()) {
          return // 警告が出た場合は処理を終了
        }

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

    const handleConfirm = useCallback(async () => {
      try {
        console.log('QRコード生成開始...')
        console.log('QRコード設定:', {
          size: qr.settings.size.value,
          ecLevel: qr.settings.ecLevel.value,
          quietZone: qr.settings.quietZone,
          hasLogo: !!qr.settings.logoFile,
          logoSize: qr.settings.logoFile
            ? {
                width: qr.settings.logo.width,
                height: qr.settings.logo.height,
                opacity: qr.settings.logo.opacity
              }
            : null
        })

        // サイズチェック
        if (checkSizeAndWarn()) {
          return // 警告が出た場合は処理を終了
        }

        const result = await generateQrCanvasUseCase.execute(qr)
        if (result.isSuccess && result.canvas) {
          console.log('QRコード内容:', qr.getContent())
          console.log('QRコード生成完了')

          // 生成されたQRコード（ロゴ付き）を読み取って検証
          try {
            const dataUrl = result.canvas.toDataURL('image/png')
            console.log('QRコードCanvas情報:', {
              width: result.canvas.width,
              height: result.canvas.height,
              dataUrlLength: dataUrl.length,
              canvasSize: `${result.canvas.width}x${result.canvas.height}`
            })

            // サイズが小さすぎる場合の警告
            if (result.canvas.width < 50 || result.canvas.height < 50) {
              console.warn('⚠️ QRコードサイズが非常に小さいです:', {
                width: result.canvas.width,
                height: result.canvas.height
              })
            }

            // まずロゴなしのQRコードでもテストしてみる
            if (qr.settings.logoFile) {
              console.log('ロゴなしQRコードでの読み取りテストを実行...')
              try {
                const qrWithoutLogo = qr.updateSettings((settings) =>
                  settings.changeLogoFile(null)
                )
                const resultWithoutLogo =
                  await generateQrCanvasUseCase.execute(qrWithoutLogo)
                if (resultWithoutLogo.isSuccess && resultWithoutLogo.canvas) {
                  const dataUrlWithoutLogo =
                    resultWithoutLogo.canvas.toDataURL('image/png')
                  const scanResultWithoutLogo =
                    await qrScannerRepository.scanFromImageUrl(
                      dataUrlWithoutLogo
                    )
                  console.log(
                    'ロゴなしQRコード読み取り結果:',
                    scanResultWithoutLogo
                  )
                  console.log(
                    'ロゴなしQRコード読み取り内容:',
                    scanResultWithoutLogo.data
                  )
                }
              } catch (logoTestError) {
                console.error(
                  'ロゴなしQRコード読み取りテストエラー:',
                  logoTestError
                )
              }
            }

            const scanResult =
              await qrScannerRepository.scanFromImageUrl(dataUrl)
            console.log('読み取り結果:', scanResult)
            console.log('期待される内容:', qr.getContent())

            // 読み取った内容を取得
            const scannedContent = scanResult.data
            console.log(
              '読み取り内容:',
              scannedContent,
              '型:',
              typeof scannedContent
            )

            // 読み取った内容と元の内容を比較
            if (scannedContent === qr.getContent()) {
              console.log('QRコードの読み取り検証成功！')
              successNotify('QRコードが正常に生成され、読み取り可能です！')
            } else {
              console.warn('読み取り内容が一致しません:', {
                expected: qr.getContent(),
                actual: scannedContent,
                expectedLength: qr.getContent().length,
                actualLength: scannedContent.length
              })
              errorNotify(
                'QRコードは生成されましたが、読み取り内容が一致しません'
              )
            }
          } catch (scanError) {
            console.error('QRコード読み取りエラー:', scanError)
            console.error('エラーの詳細:', {
              error: scanError,
              errorType: typeof scanError,
              message:
                scanError instanceof Error
                  ? scanError.message
                  : String(scanError),
              stack: scanError instanceof Error ? scanError.stack : undefined,
              name: scanError instanceof Error ? scanError.name : undefined
            })

            // より具体的なエラーメッセージを提供
            let errorMessage = 'Unknown error'
            if (scanError instanceof Error) {
              errorMessage = scanError.message
            } else if (typeof scanError === 'string') {
              errorMessage = scanError
            } else {
              errorMessage = JSON.stringify(scanError)
            }

            errorNotify(
              'QRコードは生成されましたが、読み取りに失敗しました: ' +
                errorMessage
            )
          }

          // 必要に応じてcanvasを表示用に描画
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            if (ctx) {
              canvasRef.current.width = result.canvas.width
              canvasRef.current.height = result.canvas.height
              ctx.drawImage(result.canvas, 0, 0)
              console.log('Canvasに描画完了')
            }
          }
        } else {
          console.error('確認エラー:', result.error)
          errorNotify(
            'QRコード生成に失敗しました: ' +
              (result.error?.message || 'Unknown error')
          )
        }
      } catch (error) {
        console.error('確認エラー:', error)
        errorNotify(
          'QRコード生成に失敗しました: ' +
            (error instanceof Error ? error.message : 'Unknown error')
        )
      }
    }, [
      qr,
      generateQrCanvasUseCase,
      qrScannerRepository,
      successNotify,
      errorNotify,
      checkSizeAndWarn
    ])

    // QRコードが生成可能かチェック
    const canGenerate =
      qr.isValid() && qr.qrValue.value !== '' && qr.qrValue.value.trim() !== ''

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
      </Box>
    )
  }
)

FormButton.displayName = 'FormButton'
