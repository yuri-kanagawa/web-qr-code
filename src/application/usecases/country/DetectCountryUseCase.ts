import { IGeoLocationRepository } from '@/domains/repositories/external'
import { Country } from '@/domains/valueObjects/country'
import { Language } from '@/domains/valueObjects/language'

export class DetectCountryUseCase {
  constructor(
    private readonly geoLocationRepository: IGeoLocationRepository,
    private readonly language: Language
  ) {}

  /**
   * 国を検出する
   * 1. IPアドレスから検出
   * 2. ブラウザのロケール情報から検出
   * 3. タイムゾーンから検出
   */
  async execute(): Promise<Country> {
    // 1. IPアドレスから国を取得（最も確実）
    const countryFromIP = await this.geoLocationRepository.getCountryFromIP()

    if (countryFromIP) {
      return countryFromIP
    }

    // 2. ブラウザのロケール情報から検出
    const countryFromLocale = this.detectFromLocale()

    if (countryFromLocale) {
      return countryFromLocale
    }

    // 3. タイムゾーンから検出
    const countryFromTimezone = this.detectFromTimezone()

    if (countryFromTimezone) {
      return countryFromTimezone
    }

    // デフォルトはUS
    return Country.default()
  }

  /**
   * ブラウザのロケール情報から国を検出
   */
  private detectFromLocale(): Country | null {
    const locale =
      Intl.DateTimeFormat().resolvedOptions().locale || navigator.language
    const parts = locale.split('-')
    if (parts.length >= 2) {
      const countryCode = parts[1]?.toLowerCase()
      if (countryCode && /^[a-z]{2}$/.test(countryCode)) {
        const result = Country.create(countryCode, this.language)
        return result.isSuccess ? result.country : null
      }
    }
    return null
  }

  /**
   * タイムゾーンから国を推測
   */
  private detectFromTimezone(): Country | null {
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

      const countryCode = timezoneToCountry[timezone]
      if (countryCode) {
        const result = Country.create(countryCode, this.language)
        return result.isSuccess ? result.country : null
      }
      return null
    } catch (error) {
      console.warn('Failed to detect timezone:', error)
      return null
    }
  }
}
