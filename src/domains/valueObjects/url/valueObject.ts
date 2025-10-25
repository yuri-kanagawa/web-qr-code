import { Language } from '@/domains/valueObjects/language'
import { UrlValueError } from './error'
import { UrlResult } from './result'

export class Url {
  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): UrlResult {
    try {
      new URL(value)
    } catch {
      const errorMessage =
        language.locale.message.validation.url.pleaseEnterValid
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
