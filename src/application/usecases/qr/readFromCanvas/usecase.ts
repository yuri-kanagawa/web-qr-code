import { QrCode } from '@/domains/repositories'
import { Language } from '@/domains/valueObjects/language'
import { ReadQrFromCanvasUseCaseResult } from './result'

/**
 * CanvasからQRコードを読み取るユースケース
 */
export class ReadQrFromCanvasUseCase {
  constructor(
    private readonly qrScannerRepository: IQrScannerRepository,
    private readonly language: Language
  ) {}

  /**
   * CanvasからQRコードを読み取る
   *
   * @param canvas - HTMLCanvasElement
   * @param imageType - 画像形式（デフォルト: 'image/png'）
   * @returns ReadQrFromCanvasUseCaseResult - 成功/失敗の結果
   *
   * @example
   * ```typescript
   * const result = await useCase.execute(canvasElement)
   * if (result.isSuccess) {
   *   console.log(result.qrData) // QRコードの内容
   * } else {
   *   console.error(result.errorMessage)
   * }
   * ```
   */
  async execute(
    canvas: HTMLCanvasElement | null,
    imageType: 'image/png' | 'image/jpeg' = 'image/png'
  ): Promise<ReadQrFromCanvasUseCaseResult> {
    // Canvasがnullの場合
    if (!canvas) {
      return ReadQrFromCanvasUseCaseResult.fail(
        new Error('Canvas element is null')
      )
    }

    try {
      // CanvasをData URLに変換
      const dataUrl = canvas.toDataURL(imageType)

      // QRコードをスキャン
      const result = await this.qrScannerRepository.scanFromImageUrl(dataUrl)

      return ReadQrFromCanvasUseCaseResult.ok(result.data, dataUrl)
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to read QR code from canvas'
      return ReadQrFromCanvasUseCaseResult.fail(new Error(errorMessage))
    }
  }
}
