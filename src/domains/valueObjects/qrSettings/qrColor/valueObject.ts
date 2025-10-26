import { Language } from '@/domains/valueObjects/language'
import { QrColorValueError } from './error'
import { QrColorResult } from './result'

/**
 * QRコードの色（16進数カラーコードまたは透過）
 */
export class QrColor {
  private static readonly HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/
  private static readonly TRANSPARENT_VALUES = [
    '',
    'transparent',
    'rgba(0,0,0,0)'
  ]

  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): QrColorResult {
    // 透過色の場合は許可
    if (QrColor.TRANSPARENT_VALUES.includes(value.toLowerCase())) {
      return QrColorResult.ok(new QrColor('', language))
    }

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

  /**
   * 透過色のインスタンスを作成
   */
  static transparent(language: Language = Language.default()): QrColor {
    return new QrColor('', language)
  }

  get value(): string {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  /**
   * 透過色かどうかを判定
   */
  isTransparent(): boolean {
    return (
      this._value === '' ||
      QrColor.TRANSPARENT_VALUES.includes(this._value.toLowerCase())
    )
  }

  equals(other: QrColor): boolean {
    // 透過色の場合は特殊な処理
    if (this.isTransparent() && other.isTransparent()) {
      return true
    }
    return this._value.toLowerCase() === other._value.toLowerCase()
  }
}
