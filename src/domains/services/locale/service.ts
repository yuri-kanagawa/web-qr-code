import { Country } from '@/domains/valueObjects/country'
import { Language } from '@/domains/valueObjects/language'

export class LocaleService {
  private static readonly LANGUAGE_TO_COUNTRY: Record<string, string> = {
    ja: 'jp',
    en: 'us',
    fr: 'fr',
    de: 'de'
  }

  static extractCountryCode(locale: string): string {
    const code = locale.includes('-')
      ? locale.split('-')[1]?.toLowerCase()
      : locale.toLowerCase()

    const mappedCode = LocaleService.LANGUAGE_TO_COUNTRY[code] || code

    // 国コードの形式チェック（2文字の小文字）
    return /^[a-z]{2}$/.test(mappedCode) ? mappedCode : 'us'
  }

  static detectCountry(): Country {
    const locale =
      Intl.DateTimeFormat().resolvedOptions().locale || navigator.language
    const countryCode = LocaleService.extractCountryCode(locale)

    const result = Country.create(countryCode, Language.default())
    return result.isSuccess && result.country
      ? result.country
      : Country.default()
  }

  static getCountryFromLanguage(language: Language): Country {
    const countryCode =
      LocaleService.LANGUAGE_TO_COUNTRY[language.value] || 'us'
    const result = Country.create(countryCode, language)

    return result.isSuccess && result.country
      ? result.country
      : Country.default()
  }
}
