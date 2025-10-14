import { Language } from '@/domains/valueObjects/language'
import { CountryValueError } from './error'
import { CountryResult } from './result'

export class Country {
  static readonly CODES = {
    JP: 'jp',
    US: 'us',
    FR: 'fr',
    DE: 'de',
    GB: 'gb',
    CN: 'cn',
    KR: 'kr',
    IT: 'it',
    ES: 'es',
    BR: 'br',
    AU: 'au',
    CA: 'ca',
    IN: 'in',
    RU: 'ru',
    MX: 'mx'
  } as const

  private readonly _code: string
  private readonly _language: Language

  private constructor(code: string, language: Language) {
    this._code = code
    this._language = language
  }

  static create(code: string, language: Language): CountryResult {
    // 簡易的なバリデーション（2文字の小文字）
    if (!/^[a-z]{2}$/.test(code)) {
      const errorMessage = language.isJapanese
        ? '無効な国コードです'
        : language.isFrench
          ? 'Code pays invalide'
          : 'Invalid country code'
      return new CountryResult(null, new CountryValueError(errorMessage))
    }
    return new CountryResult(new Country(code, language), null)
  }

  static jp(language: Language): Country {
    return new Country(Country.CODES.JP, language)
  }

  static us(language: Language): Country {
    return new Country(Country.CODES.US, language)
  }

  static fr(language: Language): Country {
    return new Country(Country.CODES.FR, language)
  }

  static de(language: Language): Country {
    return new Country(Country.CODES.DE, language)
  }

  static default(): Country {
    return new Country(Country.CODES.US, Language.default())
  }

  get code(): string {
    return this._code
  }

  get language(): Language {
    return this._language
  }

  equals(other: Country): boolean {
    return this._code === other._code
  }
}

