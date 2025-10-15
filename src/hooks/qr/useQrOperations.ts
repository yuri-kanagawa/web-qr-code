import {
  DownloadQrImageUseCase,
  ReadQrFromCanvasUseCase
} from '@/application/usecases'
import { QrScannerRepository } from '@/infrastructure/repositories'
import { useCallback, useMemo } from 'react'
import { useNotify } from '../useNotify'

/**
 * QRコードの操作（読み取り・ダウンロード）を提供するフック
 */
export const useQrOperations = (
  getCanvas: () => HTMLCanvasElement | null
) => {
  const { successNotify, errorNotify, warningNotify } = useNotify()
  const qrScannerRepository = useMemo(() => new QrScannerRepository(), [])

  const readQrFromCanvasUseCase = useMemo(
    () => new ReadQrFromCanvasUseCase(qrScannerRepository),
    [qrScannerRepository]
  )

  const downloadQrImageUseCase = useMemo(
    () => new DownloadQrImageUseCase(qrScannerRepository),
    [qrScannerRepository]
  )

  const onConfirm = useCallback(async (): Promise<string | undefined> => {
    const canvas = getCanvas()
    const result = await readQrFromCanvasUseCase.execute(canvas)

    if (result.isSuccess && result.qrData) {
      return result.qrData
    } else {
      warningNotify(result.errorMessage || 'QRコードを読み取れませんでした')
      return undefined
    }
  }, [getCanvas, readQrFromCanvasUseCase, warningNotify])

  const onDownload = useCallback(async () => {
    const canvas = getCanvas()
    const result = await downloadQrImageUseCase.execute(canvas, 'qr.png')

    if (result.isSuccess && result.dataUrl && result.fileName) {
      // DOM操作はUI層で実行
      const downloadLink = document.createElement('a')
      downloadLink.href = result.dataUrl
      downloadLink.download = result.fileName
      downloadLink.click()

      successNotify('Qrコードのダウンロード成功')
    } else {
      errorNotify(result.errorMessage || 'QRコードのダウンロードに失敗')
    }
  }, [getCanvas, downloadQrImageUseCase, successNotify, errorNotify])

  return {
    onConfirm,
    onDownload
  }
}

