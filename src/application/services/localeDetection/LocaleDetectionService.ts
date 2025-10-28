import { IGeoLocationRepository } from '@/domains/repositories/external'
import { Country } from '@/domains/valueObjects/country'
import { Language } from '@/domains/valueObjects/language'

export class LocaleDetectionService {
  constructor(
    private readonly geoLocationRepository: IGeoLocationRepository,
    private readonly language: Language
  ) {}

  async detectCountry(): Promise<Country> {
    // 1. IPアドレスから国を取得（最も確実）
    let country = await this.geoLocationRepository.getCountryFromIP()

    // 2. IPから取得できない場合はロケール情報から取得
    if (!country || country.value === 'us') {
      const locale =
        Intl.DateTimeFormat().resolvedOptions().locale || navigator.language
      const countryCode = this.extractCountryCodeFromLocale(locale)
      if (countryCode) {
        const result = Country.create(countryCode, this.language)
        country = result.isSuccess && result.country ? result.country : country
      }
    }

    // 3. ロケールから取得できない場合はタイムゾーンから推測
    if (!country || country.value === 'us') {
      const countryCode = this.extractCountryFromTimezone()
      if (countryCode) {
        const result = Country.create(countryCode, this.language)
        country = result.isSuccess && result.country ? result.country : country
      }
    }

    // 4. それでも取得できない場合は従来の方法
    if (!country || country.value === 'us') {
      const locale =
        Intl.DateTimeFormat().resolvedOptions().locale || navigator.language
      const countryCode = this.extractCountryCode(locale)
      const result = Country.create(countryCode, this.language)
      country = result.isSuccess && result.country ? result.country : country
    }

    return country || Country.default()
  }

  private extractCountryCode(locale: string): string {
    const code = locale.includes('-')
      ? locale.split('-')[1]?.toLowerCase()
      : locale.toLowerCase()

    const mappedCode = this.getLanguageToCountryMapping()[code] || code

    // 国コードの形式チェック（2文字の小文字）
    return /^[a-z]{2}$/.test(mappedCode) ? mappedCode : 'us'
  }

  private extractCountryCodeFromLocale(locale: string): string | null {
    // 例: "en-GB", "ja-JP", "fr-FR"
    const parts = locale.split('-')
    if (parts.length >= 2) {
      const countryCode = parts[1]?.toLowerCase()
      if (/^[a-z]{2}$/.test(countryCode)) {
        return countryCode
      }
    }
    return null
  }

  private extractCountryFromTimezone(): string | null {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      // 主要なタイムゾーンから国コードをマッピング
      const timezoneToCountry: Record<string, string> = {
        'Europe/London': 'gb',
        'Europe/Paris': 'fr',
        'Europe/Berlin': 'de',
        'Europe/Rome': 'it',
        'Europe/Madrid': 'es',
        'Asia/Tokyo': 'jp',
        'Asia/Shanghai': 'cn',
        'Asia/Seoul': 'kr',
        'America/New_York': 'us',
        'America/Los_Angeles': 'us',
        'America/Chicago': 'us',
        'America/Toronto': 'ca',
        'Australia/Sydney': 'au',
        'Australia/Melbourne': 'au',
        'Pacific/Auckland': 'nz'
      }

      return timezoneToCountry[timezone] || null
    } catch (error) {
      console.warn('Failed to detect timezone:', error)
      return null
    }
  }

  private getLanguageToCountryMapping(): Record<string, string> {
    return {
      ja: 'jp',
      en: 'us',
      fr: 'fr',
      de: 'de'
    }
  }
}
