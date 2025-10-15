import { Result } from '@/domains/common'

/**
 * ReadQrFromCanvasUseCaseの実行結果
 * 
 * @example
 * ```typescript
 * const result = await useCase.execute(canvas)
 * if (result.isSuccess) {
 *   console.log(result.qrData) // QRコードの内容
 *   console.log(result.imageDataUrl) // 画像のData URL
 * } else {
 *   console.error(result.errorMessage)
 * }
 * ```
 */
export class ReadQrFromCanvasUseCaseResult extends Result<
  { qrData: string; imageDataUrl: string },
  Error
> {
  private constructor(
    value: { qrData: string; imageDataUrl: string } | null,
    error: Error | null
  ) {
    super(value, error)
  }

  /**
   * QRコードの内容（成功時のみ）
   */
  get qrData(): string | null {
    return this.value?.qrData ?? null
  }

  /**
   * 画像のData URL（成功時のみ）
   */
  get imageDataUrl(): string | null {
    return this.value?.imageDataUrl ?? null
  }

  /**
   * 成功を表すResultを作成
   */
  static ok(
    qrData: string,
    imageDataUrl: string
  ): ReadQrFromCanvasUseCaseResult {
    return new ReadQrFromCanvasUseCaseResult({ qrData, imageDataUrl }, null)
  }

  /**
   * 失敗を表すResultを作成
   */
  static fail(error: Error): ReadQrFromCanvasUseCaseResult {
    return new ReadQrFromCanvasUseCaseResult(null, error)
  }
}

