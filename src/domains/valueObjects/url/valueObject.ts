import { UrlResult } from './result'
import { UrlValueError } from './error'
import { Language } from '@/domains/valueObjects/language'

export class Url {
  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): UrlResult {
    // 空文字の場合はそのまま許可（初期値として）
    if (value.trim().length === 0) {
      return new UrlResult(new Url('', language), null)
    }

    // URL形式のバリデーション
    try {
      new URL(value)
    } catch {
      const errorMessage = language.isJapanese
        ? '有効なURLを入力してください'
        : language.isFrench
        ? 'Veuillez saisir une URL valide'
        : 'Please enter a valid URL'
      return new UrlResult(null, new UrlValueError(errorMessage))
    }

    return new UrlResult(new Url(value.trim(), language), null)
  }

  static empty(language: Language): Url {
    return new Url('', language)
  }

  static default(): Url {
    return new Url('', Language.default())
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

  equals(other: Url): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
