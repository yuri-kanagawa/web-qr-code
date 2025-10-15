import { Language } from '@/domains/valueObjects/language'
import { EcLevelValueError } from './error'
import { EcLevelResult } from './result'

/**
 * QRコードのエラー訂正レベル
 * L: 約7%の誤り訂正
 * M: 約15%の誤り訂正（デフォルト）
 * Q: 約25%の誤り訂正
 * H: 約30%の誤り訂正
 */
export class EcLevel {
  static readonly LEVELS = {
    L: 'L',
    M: 'M',
    Q: 'Q',
    H: 'H'
  } as const

  static readonly list = ['L', 'M', 'Q', 'H'] as const

  private readonly _value: 'L' | 'M' | 'Q' | 'H'
  private readonly _language: Language

  private constructor(value: 'L' | 'M' | 'Q' | 'H', language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): EcLevelResult {
    if (!EcLevel.list.includes(value as any)) {
      const errorMessage = language.isJapanese
        ? '無効なエラー訂正レベルです。L, M, Q, Hのいずれかを指定してください'
        : 'Invalid error correction level. Must be L, M, Q, or H'
      return EcLevelResult.fail(new EcLevelValueError(errorMessage))
    }
    return EcLevelResult.ok(
      new EcLevel(value as 'L' | 'M' | 'Q' | 'H', language)
    )
  }

  static default(): EcLevel {
    return new EcLevel('M', Language.default())
  }

  static L(language: Language = Language.default()): EcLevel {
    return new EcLevel('L', language)
  }

  static M(language: Language = Language.default()): EcLevel {
    return new EcLevel('M', language)
  }

  static Q(language: Language = Language.default()): EcLevel {
    return new EcLevel('Q', language)
  }

  static H(language: Language = Language.default()): EcLevel {
    return new EcLevel('H', language)
  }

  get value(): 'L' | 'M' | 'Q' | 'H' {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  get name(): string {
    if (this._language.isJapanese) {
      switch (this._value) {
        case 'L':
          return '低 (L)'
        case 'M':
          return '中 (M)'
        case 'Q':
          return '高 (Q)'
        case 'H':
          return '最高 (H)'
      }
    }

    switch (this._value) {
      case 'L':
        return 'Low (L)'
      case 'M':
        return 'Medium (M)'
      case 'Q':
        return 'Quartile (Q)'
      case 'H':
        return 'High (H)'
    }
  }

  equals(other: EcLevel): boolean {
    return this._value === other._value
  }
}

