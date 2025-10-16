import { Language } from '@/domains/valueObjects/language'
import { EyeRadiusValueError } from './error'
import { EyeRadiusResult } from './result'

/**
 * QRコードのEye（ファインダーパターン）の角の丸み
 * 最小: 0（四角）、最大: 20（丸）
 */
export class EyeRadius {
  static readonly MIN = 0
  static readonly MAX = 20
  static readonly DEFAULT = 0

  private readonly _value: number
  private readonly _language: Language

  private constructor(value: number, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: number, language: Language): EyeRadiusResult {
    if (isNaN(value)) {
      const errorMessage = language.isJapanese
        ? '角の丸みは数値である必要があります'
        : 'Eye radius must be a number'
      return EyeRadiusResult.fail(new EyeRadiusValueError(errorMessage))
    }

    if (value < EyeRadius.MIN || value > EyeRadius.MAX) {
      const errorMessage = language.isJapanese
        ? `角の丸みは${EyeRadius.MIN}から${EyeRadius.MAX}の範囲で指定してください`
        : `Eye radius must be between ${EyeRadius.MIN} and ${EyeRadius.MAX}`
      return EyeRadiusResult.fail(new EyeRadiusValueError(errorMessage))
    }

    return EyeRadiusResult.ok(new EyeRadius(value, language))
  }

  static default(): EyeRadius {
    return new EyeRadius(EyeRadius.DEFAULT, Language.default())
  }

  get value(): number {
    return this._value
  }

  equals(other: EyeRadius): boolean {
    return this._value === other._value
  }
}
