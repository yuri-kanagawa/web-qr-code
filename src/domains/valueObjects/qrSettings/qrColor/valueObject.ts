import { Language } from '@/domains/valueObjects/language'
import { QrColorValueError } from './error'
import { QrColorResult } from './result'

/**
 * QRコードの色（16進数カラーコード）
 */
export class QrColor {
  private static readonly HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/

  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): QrColorResult {
    if (!QrColor.HEX_COLOR_PATTERN.test(value)) {
      const errorMessage = language.isJapanese
        ? '色は#RRGGBB形式の16進数で指定してください'
        : 'Color must be in #RRGGBB hexadecimal format'
      return QrColorResult.fail(new QrColorValueError(errorMessage))
    }
    return QrColorResult.ok(new QrColor(value, language))
  }

  static black(language: Language = Language.default()): QrColor {
    return new QrColor('#000000', language)
  }

  static white(language: Language = Language.default()): QrColor {
    return new QrColor('#ffffff', language)
  }

  static default(): QrColor {
    return QrColor.black()
  }

  get value(): string {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  equals(other: QrColor): boolean {
    return this._value.toLowerCase() === other._value.toLowerCase()
  }
}

