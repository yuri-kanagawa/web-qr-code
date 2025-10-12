import { LanguageResult } from './result'
import { LanguageValueError } from './error'
import { Locale, locales, languages } from '@/locales/language'
import type { LanguageKey } from '@/locales/language'

export type { LanguageKey }

export class Language {
  private readonly _value: LanguageKey

  private constructor(value: LanguageKey) {
    this._value = value
  }

  static create(value: string): LanguageResult {
    if (!Object.keys(languages).includes(value)) {
      return new LanguageResult(
        null,
        new LanguageValueError(`Invalid language value: ${value}`)
      )
    }
    return new LanguageResult(new Language(value as LanguageKey), null)
  }

  static default(): Language {
    return new Language('en')
  }

  static getAllLanguages(): ReadonlyArray<{ key: LanguageKey; label: string }> {
    return Object.entries(languages).map(([key, label]) => ({
      key: key as LanguageKey,
      label
    }))
  }

  get value(): LanguageKey {
    return this._value
  }

  get label(): string {
    return languages[this._value]
  }

  get isEnglish(): boolean {
    return this._value === 'en'
  }

  get isJapanese(): boolean {
    return this._value === 'ja'
  }

  get isFrench(): boolean {
    return this._value === 'fr'
  }

  equals(other: Language): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }

  getLocale(): Locale {
    return locales[this._value]
  }
}
