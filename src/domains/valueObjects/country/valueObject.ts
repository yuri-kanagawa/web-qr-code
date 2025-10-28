import { Language } from '@/domains/valueObjects/language'
import { CountryResult } from './result'

export class Country {
  static readonly JP = 'jp'
  static readonly US = 'us'
  static readonly FR = 'fr'
  static readonly DE = 'de'
  static readonly GB = 'gb'
  static readonly CN = 'cn'
  static readonly KR = 'kr'
  static readonly IT = 'it'
  static readonly ES = 'es'
  static readonly BR = 'br'
  static readonly AU = 'au'
  static readonly CA = 'ca'
  static readonly IN = 'in'
  static readonly RU = 'ru'
  static readonly MX = 'mx'

  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): CountryResult {
    // 有効な国コードのマップ
    const validCodes = [
      Country.JP,
      Country.US,
      Country.FR,
      Country.DE,
      Country.GB,
      Country.CN,
      Country.KR,
      Country.IT,
      Country.ES,
      Country.BR,
      Country.AU,
      Country.CA,
      Country.IN,
      Country.RU,
      Country.MX
    ]

    // 国コードが直接渡された場合
    if (validCodes.includes(value)) {
      return new CountryResult(new Country(value, language), null)
    }

    // 言語コードから国コードを決定（後方互換性のため）
    let countryCode: string
    switch (value) {
      case 'ja':
        countryCode = Country.JP
        break
      case 'en':
        countryCode = Country.US
        break
      case 'fr':
        countryCode = Country.FR
        break
      case 'de':
        countryCode = Country.DE
        break
      default:
        countryCode = Country.US // デフォルトはUS
    }

    return new CountryResult(new Country(countryCode, language), null)
  }

  static jp(language: Language): Country {
    return new Country(Country.JP, language)
  }

  static us(language: Language): Country {
    return new Country(Country.US, language)
  }

  static fr(language: Language): Country {
    return new Country(Country.FR, language)
  }

  static de(language: Language): Country {
    return new Country(Country.DE, language)
  }

  static default(): Country {
    return new Country(Country.US, Language.default())
  }

  get value(): string {
    return this._value || 'us'
  }

  get codeUpperCase(): string {
    return this._value?.toUpperCase() || 'US'
  }

  get language(): Language {
    return this._language
  }

  equals(other: Country): boolean {
    return this._value === other._value
  }
}
