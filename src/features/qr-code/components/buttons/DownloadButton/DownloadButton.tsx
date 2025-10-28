'use client'

import { DownloadQrCodeUseCase } from '@/application/usecases'
import { QrCode } from '@/domains'
import { QrGeneratorRepository } from '@/infrastructure/repositories/external/qrGenerator/client/repository'
import { QrScannerRepository } from '@/infrastructure/repositories/external/qrScanner/client/repository'
import { Button } from '@/ui/cores'
import { FC, useCallback } from 'react'

type Props = {
  onClick?: () => void
  isValid?: boolean
  qr: QrCode
}

export const DownloadButton: FC<Props> = ({ onClick, isValid = true, qr }) => {
  const locale = qr.language.locale

  const handleInternalDownload = useCallback(async () => {
    if (!qr) {
      console.log('QRオブジェクトが存在しません')
      return
    }

    try {
      console.log('=== ダウンロード処理開始 ===')

      // 既存のusecaseを使用
      const qrGeneratorRepository = new QrGeneratorRepository(qr.language)
      const qrScannerRepository = new QrScannerRepository(qr.language)
      const downloadUseCase = new DownloadQrCodeUseCase(
        qrGeneratorRepository,
        qrScannerRepository,
        qr.language
      )

      const result = await downloadUseCase.execute(qr)

      if (result.isSuccess && result.fileName && result.dataUrl) {
        // ダウンロード実行
        const link = document.createElement('a')
        link.download = result.fileName
        link.href = result.dataUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log('ダウンロード完了')
      } else {
        console.error('ダウンロード失敗:', result.error)
      }
    } catch (error) {
      console.error('ダウンロード処理でエラーが発生しました', error)
    }
  }, [qr])

  const onPress = useCallback(() => {
    if (!isValid) return
    // 外部 onClick があればそれを優先し、なければ内部処理
    if (onClick) {
      onClick()
      return
    }
    void handleInternalDownload()
  }, [isValid, onClick, handleInternalDownload])

  return (
    <Button variant="contained" onClick={onPress} disabled={!isValid}>
      {locale.word.buttons.download}
    </Button>
  )
}
