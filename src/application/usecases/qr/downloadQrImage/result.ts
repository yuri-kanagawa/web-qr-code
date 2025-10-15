import { Result } from '@/domains/common'

/**
 * DownloadQrImageUseCaseの実行結果
 *
 * @example
 * ```typescript
 * const result = await useCase.execute(canvas, 'qr.png')
 * if (result.isSuccess) {
 *   const link = document.createElement('a')
 *   link.href = result.dataUrl!
 *   link.download = result.fileName!
 *   link.click()
 * }
 * ```
 */
export class DownloadQrImageUseCaseResult extends Result<
  { dataUrl: string; fileName: string },
  Error
> {
  private constructor(
    value: { dataUrl: string; fileName: string } | null,
    error: Error | null
  ) {
    super(value, error)
  }

  /**
   * ダウンロード用のData URL（成功時のみ）
   */
  get dataUrl(): string | null {
    return this.value?.dataUrl ?? null
  }

  /**
   * ダウンロードファイル名（成功時のみ）
   */
  get fileName(): string | null {
    return this.value?.fileName ?? null
  }

  /**
   * 成功を表すResultを作成
   */
  static ok(dataUrl: string, fileName: string): DownloadQrImageUseCaseResult {
    return new DownloadQrImageUseCaseResult({ dataUrl, fileName }, null)
  }

  /**
   * 失敗を表すResultを作成
   */
  static fail(error: Error): DownloadQrImageUseCaseResult {
    return new DownloadQrImageUseCaseResult(null, error)
  }
}
