/**
 * QRコードCanvas生成の結果を表すクラス
 */
export class GenerateQrCanvasUseCaseResult {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly canvas?: HTMLCanvasElement,
    public readonly error?: Error
  ) {}

  /**
   * 成功結果を作成
   */
  static ok(canvas: HTMLCanvasElement): GenerateQrCanvasUseCaseResult {
    return new GenerateQrCanvasUseCaseResult(true, canvas)
  }

  /**
   * 失敗結果を作成
   */
  static fail(error: Error): GenerateQrCanvasUseCaseResult {
    return new GenerateQrCanvasUseCaseResult(false, undefined, error)
  }
}
