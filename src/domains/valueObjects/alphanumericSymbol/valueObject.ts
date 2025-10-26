import { AlphanumericSymbolValueError } from './error'
import { AlphanumericSymbol, AlphanumericSymbolResult } from './result'

export class AlphanumericSymbol {
  private readonly _value: string

  private constructor(value: string) {
    this._value = value
  }

  static create(value: string): AlphanumericSymbolResult {
    // アルファベット、数字、記号のみを許可
    const alphanumericSymbolRegex =
      /^[a-zA-Z0-9\s\-_.,!?@#$%^&*()+=\[\]{}|;':"\\,.<>\/?`~]*$/

    if (!alphanumericSymbolRegex.test(value)) {
      return new AlphanumericSymbolResult(
        null,
        new AlphanumericSymbolValueError(
          'Only alphanumeric characters and symbols are allowed'
        )
      )
    }

    // 最大長制限（QRコードの制限に合わせて）
    const maxLength = 2953 // QRコードの最大容量（数字のみの場合）
    if (value.length > maxLength) {
      return new AlphanumericSymbolResult(
        null,
        new AlphanumericSymbolValueError(
          `Alphanumeric symbol must be ${maxLength} characters or less`
        )
      )
    }

    return new AlphanumericSymbolResult(new AlphanumericSymbol(value), null)
  }

  static default(): AlphanumericSymbol {
    return new AlphanumericSymbol('')
  }

  get value(): string {
    return this._value
  }

  equals(other: AlphanumericSymbol): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
