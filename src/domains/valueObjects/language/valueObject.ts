import { Country } from '@/domains/valueObjects/country'
import { Locale } from '@/locales'
import { LanguageValueError } from './error'
import { LanguageResult } from './result'

// サポートされる言語の定義
const LANGUAGES = {
  en: 'English',
  ja: '日本語',
  fr: 'Français'
} as const

export type LanguageKey = keyof typeof LANGUAGES

export class Language {
  private readonly _value: LanguageKey

  static readonly LANGUAGES = LANGUAGES

  private constructor(value: LanguageKey) {
    this._value = value
  }

  static create(value: string): LanguageResult {
    if (!Object.keys(Language.LANGUAGES).includes(value)) {
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
    return Object.entries(Language.LANGUAGES).map(([key, label]) => ({
      key: key as LanguageKey,
      label
    }))
  }

  /**
   * ページ生成用の言語リストを取得（英語を除く）
   * 英語はデフォルトパスでアクセスするため、[language]ルートの生成には不要
   */
  static getPageLanguages(): ReadonlyArray<{
    key: LanguageKey
    label: string
  }> {
    return Object.entries(Language.LANGUAGES)
      .filter(([key]) => key !== Language.default().value)
      .map(([key, label]) => ({
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
        return '🇬🇧'
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
        return require('@/locales/en').en
      case 'ja':
        return require('@/locales/ja').ja
      case 'fr':
        return require('@/locales/fr').fr
      default:
        return require('@/locales/en').en
    }
  }

  get country(): Country {
    const result = Country.create(this._value, this)
    return result.isSuccess && result.country
      ? result.country
      : Country.default()
  }
}
