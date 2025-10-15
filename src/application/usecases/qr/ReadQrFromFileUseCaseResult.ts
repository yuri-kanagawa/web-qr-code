import { Qr } from '@/domains/valueObjects/qr'

/**
 * ReadQrFromFileUseCaseの実行結果
 */
export class ReadQrFromFileUseCaseResult {
  constructor(
    private readonly _qr: Qr | null,
    private readonly _error: Error | null
  ) {}

  /**
   * 成功した場合
   */
  get isSuccess(): boolean {
    return this._qr !== null && this._error === null
  }

  /**
   * 失敗した場合
   */
  get isFailure(): boolean {
    return !this.isSuccess
  }

  /**
   * QRコードデータ（成功時のみ）
   */
  get qr(): Qr | null {
    return this._qr
  }

  /**
   * エラー情報（失敗時のみ）
   */
  get error(): Error | null {
    return this._error
  }

  /**
   * エラーメッセージ
   */
  get errorMessage(): string {
    return this._error?.message || ''
  }
}
