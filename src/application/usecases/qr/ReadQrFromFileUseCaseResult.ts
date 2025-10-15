import { Result } from '@/domains/common'
import { Qr } from '@/domains/valueObjects/qr'

/**
 * ReadQrFromFileUseCaseの実行結果
 *
 * @example
 * ```typescript
 * const result = await useCase.execute(file, language)
 * if (result.isSuccess) {
 *   console.log(result.qr?.value) // QRコードの内容
 * } else {
 *   console.error(result.errorMessage)
 * }
 * ```
 */
export class ReadQrFromFileUseCaseResult extends Result<Qr, Error> {
  private constructor(value: Qr | null, error: Error | null) {
    super(value, error)
  }

  /**
   * QRコードデータ（成功時のみ）
   * valueのエイリアス
   */
  get qr(): Qr | null {
    return this.value
  }

  /**
   * 成功を表すResultを作成
   */
  static ok(qr: Qr): ReadQrFromFileUseCaseResult {
    return new ReadQrFromFileUseCaseResult(qr, null)
  }

  /**
   * 失敗を表すResultを作成
   */
  static fail(error: Error): ReadQrFromFileUseCaseResult {
    return new ReadQrFromFileUseCaseResult(null, error)
  }
}
