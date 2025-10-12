import { NameResult } from './result'
import { NameValueError } from './error'
import { Language } from '@/domains/valueObjects/language'

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
      const errorMessage = language.isJapanese
        ? '名前が長すぎます（最大100文字）'
        : language.isFrench
        ? 'Le nom est trop long (100 caractères maximum)'
        : 'Name is too long (maximum 100 characters)'
      return new NameResult(null, new NameValueError(errorMessage))
    }

    return new NameResult(new Name(value.trim(), language), null)
  }

  static empty(language: Language): Name {
    return new Name('', language)
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
