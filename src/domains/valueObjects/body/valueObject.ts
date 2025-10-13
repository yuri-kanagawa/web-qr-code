import { Language } from '@/domains/valueObjects/language'
import { BodyValueError } from './error'
import { BodyResult } from './result'

export class Body {
  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): BodyResult {
    // 長さチェック（QRコードの最大容量を考慮）
    const maxLength = 4000
    if (value.length > maxLength) {
      const errorMessage = language.isJapanese
        ? `本文が長すぎます（最大${maxLength}文字）`
        : language.isFrench
          ? `Le corps du message est trop long (${maxLength} caractères maximum)`
          : `Body is too long (maximum ${maxLength} characters)`
      return new BodyResult(null, new BodyValueError(errorMessage))
    }

    return new BodyResult(new Body(value, language), null)
  }

  static empty(language: Language): Body {
    return new Body('', language)
  }

  static default(): Body {
    return new Body('', Language.default())
  }

  get value(): string {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  get isEmpty(): boolean {
    return this._value.length === 0
  }

  get length(): number {
    return this._value.length
  }

  equals(other: Body): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
