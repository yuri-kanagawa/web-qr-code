/**
 * QRコードダウンロードの結果を表すクラス
 */
export class DownloadQrCodeUseCaseResult {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly dataUrl?: string,
    public readonly fileName?: string,
    public readonly error?: Error
  ) {}

  /**
   * 成功結果を作成
   */
  static ok(dataUrl: string, fileName: string): DownloadQrCodeUseCaseResult {
    return new DownloadQrCodeUseCaseResult(true, dataUrl, fileName)
  }

  /**
   * 失敗結果を作成
   */
  static fail(error: Error): DownloadQrCodeUseCaseResult {
    return new DownloadQrCodeUseCaseResult(false, undefined, undefined, error)
  }
}
