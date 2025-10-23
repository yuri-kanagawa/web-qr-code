import { en, ja, LanguageKey, languages, Locale } from '@/locales'
import { LanguageValueError } from './error'
import { LanguageResult } from './result'
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

  get flag(): string {
    switch (this._value) {
      case 'en':
        return '🇺🇸'
      case 'ja':
        return '🇯🇵'
      case 'fr':
        return '🇫🇷'
      default:
        return '🌐'
    }
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

  get locale(): Locale {
    // 直接ロケールを取得して循環依存を回避
    switch (this._value) {
      case 'en':
        return en
      case 'ja':
        return ja
      case 'fr':
        return en // フランス語はまだ実装されていないので英語を返す
      default:
        return en
    }
  }
}
