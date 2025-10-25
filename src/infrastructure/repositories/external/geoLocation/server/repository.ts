import { GeoLocation } from '@/domains/entities/geoLocation'
import { IGeoLocationRepository } from '@/domains/repositories/external/geoLocation'
import { Language } from '@/domains/valueObjects/language'

/**
 * ipapi.coを使用した位置情報取得の実装（サーバーサイド/クライアントサイド両方で使用可能）
 */
export class IpApiGeoLocationRepository implements IGeoLocationRepository {
  private readonly apiUrl = 'https://ipapi.co/json/'
  private readonly language: Language

  constructor(language: Language) {
    this.language = language
  }

  async getLocationFromIpAddress(): Promise<GeoLocation> {
    try {
      console.log('Fetching location from IP API...')
      const response = await fetch(this.apiUrl)

      if (!response.ok) {
        console.warn(`API request failed with status: ${response.status}`)
        return GeoLocation.default()
      }

      const data = await response.json()
      console.log('IP geolocation result:', data)

      // データの検証
      if (
        !data.latitude ||
        !data.longitude ||
        isNaN(data.latitude) ||
        isNaN(data.longitude)
      ) {
        console.warn('Invalid location data from API:', data)
        return GeoLocation.default()
      }

      const country = this.translateCountryName(data.country_name || 'Unknown')
      const geoLocation = GeoLocation.create(
        data.latitude,
        data.longitude,
        country,
        this.language
      )

      if (geoLocation) {
        return geoLocation
      }

      console.warn('Failed to create GeoLocation')
      return GeoLocation.default()
    } catch (error) {
      console.error('Error fetching location from IP:', error)
      return GeoLocation.default()
    }
  }

  /**
   * ブラウザのGeolocation APIはサーバーサイドでは使用できないため、エラーを返す
   */
  async getCurrentPosition(): Promise<GeoLocation> {
    throw new Error('getCurrentPosition is not supported on server-side.')
  }

  /**
   * 国名を言語に応じて翻訳（簡易版）
   */
  private translateCountryName(countryName: string): string {
    if (!this.language.isJapanese) {
      return countryName
    }

    // 主要国のみ翻訳
    const translations: Record<string, string> = {
      Japan: '日本',
      'United States': 'アメリカ',
      'United Kingdom': 'イギリス',
      France: 'フランス',
      Germany: 'ドイツ',
      China: '中国',
      'South Korea': '韓国',
      Italy: 'イタリア',
      Spain: 'スペイン',
      Brazil: 'ブラジル',
      Australia: 'オーストラリア',
      Canada: 'カナダ',
      India: 'インド',
      Russia: 'ロシア',
      Mexico: 'メキシコ'
    }

    return translations[countryName] || countryName
  }
}
