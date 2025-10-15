/**
 * 処理結果を表す基底クラス
 * 成功または失敗のいずれかを保持し、例外を使わずに安全に結果を扱える
 *
 * @template T - 成功時の値の型
 * @template E - 失敗時のエラーの型（Errorを継承）
 *
 * @example
 * ```typescript
 * // 成功の場合
 * const result = Result.ok(value)
 * if (result.isSuccess) {
 *   console.log(result.value)
 * }
 *
 * // 失敗の場合
 * const result = Result.fail(new Error('エラーメッセージ'))
 * if (result.isFailure) {
 *   console.error(result.errorMessage)
 * }
 * ```
 */
export abstract class Result<T, E extends Error = Error> {
  protected constructor(
    private readonly _value: T | null,
    private readonly _error: E | null
  ) {
    // ビジネスルール：成功と失敗は排他的
    if ((_value === null) === (_error === null)) {
      throw new Error(
        'Result must have either value or error, not both or neither'
      )
    }
  }

  /**
   * 成功したかどうか
   */
  get isSuccess(): boolean {
    return this._value !== null
  }

  /**
   * 失敗したかどうか
   */
  get isFailure(): boolean {
    return this._error !== null
  }

  /**
   * 成功時の値（失敗時はnull）
   */
  get value(): T | null {
    return this._value
  }

  /**
   * 失敗時のエラー（成功時はnull）
   */
  get error(): E | null {
    return this._error
  }

  /**
   * エラーメッセージ（失敗時のみ）
   */
  get errorMessage(): string {
    return this._error?.message || ''
  }

  /**
   * 値を安全に取得（失敗時はデフォルト値を返す）
   *
   * @param defaultValue - 失敗時に返すデフォルト値
   * @returns 成功時は値、失敗時はデフォルト値
   */
  getOrElse(defaultValue: T): T {
    return this._value ?? defaultValue
  }

  /**
   * 成功を表すResultを作成（protected - 派生クラスでok()を実装する際に使用）
   */
  protected static createOk<T, E extends Error = Error>(
    value: T
  ): Result<T, E> {
    return new OkResult(value)
  }

  /**
   * 失敗を表すResultを作成（protected - 派生クラスでfail()を実装する際に使用）
   */
  protected static createFail<T, E extends Error = Error>(
    error: E
  ): Result<T, E> {
    return new FailResult(error)
  }
}

/**
 * 成功を表すResult（内部実装用）
 * @internal
 */
class OkResult<T, E extends Error> extends Result<T, E> {
  constructor(value: T) {
    super(value, null)
  }
}

/**
 * 失敗を表すResult（内部実装用）
 * @internal
 */
class FailResult<T, E extends Error> extends Result<T, E> {
  constructor(error: E) {
    super(null, error)
  }
}
