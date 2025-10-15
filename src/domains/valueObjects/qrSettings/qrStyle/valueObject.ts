import { Language } from '@/domains/valueObjects/language'
import { QrStyleValueError } from './error'
import { QrStyleResult } from './result'

/**
 * QRコードのスタイル
 */
export class QrStyle {
  static readonly STYLES = {
    SQUARES: 'squares',
    DOTS: 'dots',
    FLUID: 'fluid'
  } as const

  static readonly list = ['squares', 'dots', 'fluid'] as const

  private readonly _value: 'squares' | 'dots' | 'fluid' | undefined
  private readonly _language: Language

  private constructor(
    value: 'squares' | 'dots' | 'fluid' | undefined,
    language: Language
  ) {
    this._value = value
    this._language = language
  }

  static create(
    value: string | null | undefined,
    language: Language
  ): QrStyleResult {
    // undefinedまたはnullは許容
    if (value === null || value === undefined || value === '') {
      return QrStyleResult.ok(new QrStyle(undefined, language))
    }

    if (!QrStyle.list.includes(value as any)) {
      const errorMessage = language.isJapanese
        ? '無効なQRスタイルです。squares, dots, fluidのいずれかを指定してください'
        : 'Invalid QR style. Must be squares, dots, or fluid'
      return QrStyleResult.fail(new QrStyleValueError(errorMessage))
    }

    return QrStyleResult.ok(
      new QrStyle(value as 'squares' | 'dots' | 'fluid', language)
    )
  }

  static default(): QrStyle {
    return new QrStyle(undefined, Language.default())
  }

  static squares(language: Language = Language.default()): QrStyle {
    return new QrStyle('squares', language)
  }

  static dots(language: Language = Language.default()): QrStyle {
    return new QrStyle('dots', language)
  }

  static fluid(language: Language = Language.default()): QrStyle {
    return new QrStyle('fluid', language)
  }

  get value(): 'squares' | 'dots' | 'fluid' | undefined {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  get name(): string {
    if (!this._value) {
      return this._language.isJapanese ? 'なし' : 'None'
    }

    if (this._language.isJapanese) {
      switch (this._value) {
        case 'squares':
          return '四角'
        case 'dots':
          return 'ドット'
        case 'fluid':
          return '流体'
      }
    }

    switch (this._value) {
      case 'squares':
        return 'Squares'
      case 'dots':
        return 'Dots'
      case 'fluid':
        return 'Fluid'
    }
  }

  get isSquares(): boolean {
    return this._value === 'squares'
  }

  get isDots(): boolean {
    return this._value === 'dots'
  }

  get isFluid(): boolean {
    return this._value === 'fluid'
  }

  get isNotSet(): boolean {
    return this._value === undefined
  }

  equals(other: QrStyle): boolean {
    return this._value === other._value
  }
}
