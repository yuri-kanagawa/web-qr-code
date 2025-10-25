import { Language } from '@/domains/valueObjects/language'
import { NameValueError } from './error'
import { NameResult } from './result'

export class Name {
  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): NameResult {
    // 長さチェック
    if (value.length > 100) {
      const errorMessage = language.locale.message.validation.name.tooLong(100)
      return new NameResult(null, new NameValueError(errorMessage))
    }

    return new NameResult(new Name(value.trim(), language), null)
  }

  static empty(language: Language): Name {
    return new Name('', language)
  }

  static default(): Name {
    return new Name('', Language.default())
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

  equals(other: Name): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
