import { Language } from '@/domains/valueObjects/language'
import { QrSizeValueError } from './error'
import { QrSizeResult } from './result'

/**
 * QRコードのサイズ（ピクセル）
 * 最小: 50px、最大: 1000px
 */
export class QrSize {
  static readonly MIN = 50
  static readonly MAX = 1000
  static readonly DEFAULT = 150

  private readonly _value: number
  private readonly _language: Language

  private constructor(value: number, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: number, language: Language): QrSizeResult {
    if (isNaN(value)) {
      const errorMessage = language.isJapanese
        ? 'サイズは数値である必要があります'
        : 'Size must be a number'
      return QrSizeResult.fail(new QrSizeValueError(errorMessage))
    }

    if (value < QrSize.MIN || value > QrSize.MAX) {
      const errorMessage = language.isJapanese
        ? `サイズは${QrSize.MIN}から${QrSize.MAX}の範囲で指定してください`
        : `Size must be between ${QrSize.MIN} and ${QrSize.MAX}`
      return QrSizeResult.fail(new QrSizeValueError(errorMessage))
    }

    return QrSizeResult.ok(new QrSize(value, language))
  }

  static default(): QrSize {
    return new QrSize(QrSize.DEFAULT, Language.default())
  }

  get value(): number {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  equals(other: QrSize): boolean {
    return this._value === other._value
  }
}

