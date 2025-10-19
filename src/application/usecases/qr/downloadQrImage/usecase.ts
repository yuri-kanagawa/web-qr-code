import { QrCode } from '@/domains/repositories'
import { Language } from '@/domains/valueObjects/language'
import { DownloadQrImageUseCaseResult } from './result'

/**
 * CanvasからQRコード画像をダウンロードするユースケース
 */
export class DownloadQrImageUseCase {
  constructor(
    private readonly qrScannerRepository: IQrScannerRepository,
    private readonly language: Language
  ) {}

  /**
   * CanvasからQRコード画像をダウンロード用のData URLを取得
   *
   * @param canvas - HTMLCanvasElement
   * @param fileName - ダウンロードファイル名（拡張子含む）
   * @param imageType - 画像形式（デフォルト: 'image/png'）
   * @returns DownloadQrImageUseCaseResult - 成功/失敗の結果
   *
   * @example
   * ```typescript
   * const result = await useCase.execute(canvasElement, 'qr.png')
   * if (result.isSuccess) {
   *   // UI層でダウンロード実行
   *   const link = document.createElement('a')
   *   link.href = result.dataUrl
   *   link.download = result.fileName
   *   link.click()
   * }
   * ```
   */
  async execute(
    canvas: HTMLCanvasElement | null,
    fileName: string = 'qr.png',
    imageType: 'image/png' | 'image/jpeg' = 'image/png'
  ): Promise<DownloadQrImageUseCaseResult> {
    // Canvasがnullの場合
    if (!canvas) {
      return DownloadQrImageUseCaseResult.fail(
        new Error('Canvas element is null')
      )
    }

    try {
      // CanvasをData URLに変換
      const dataUrl = canvas.toDataURL(imageType)

      // QRコードが読み取れるか検証
      await this.qrScannerRepository.scanFromImageUrl(dataUrl)

      return DownloadQrImageUseCaseResult.ok(dataUrl, fileName)
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to prepare QR image for download'
      return DownloadQrImageUseCaseResult.fail(new Error(errorMessage))
    }
  }
}
