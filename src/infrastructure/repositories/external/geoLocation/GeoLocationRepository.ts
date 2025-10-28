import { GeoLocation } from '@/domains/entities/geoLocation'
import { IGeoLocationRepository } from '@/domains/repositories/external/geoLocation/IGeoLocationRepository'
import { Country } from '@/domains/valueObjects/country'
import { Language } from '@/domains/valueObjects/language'

/**
 * 位置情報取得のためのリポジトリ実装
 * 外部APIとブラウザのGeolocation APIを使用
 */
export class GeoLocationRepository implements IGeoLocationRepository {
  private readonly language: Language

  constructor(language: Language = Language.default()) {
    this.language = language
  }

  /**
   * IPアドレスから位置情報を取得（外部API使用）
   */
  async getLocationFromIpAddress(): Promise<GeoLocation> {
    try {
      // ipapi.coを使用してIPアドレスから位置情報を取得
      const response = await fetch('https://ipapi.co/json/')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // データの検証
      if (!data.latitude || !data.longitude || !data.country_name) {
        throw new Error('Invalid location data received')
      }

      return (
        GeoLocation.create(
          data.latitude,
          data.longitude,
          data.country_name,
          this.language
        ) || GeoLocation.default()
      )
    } catch (error) {
      console.error('Error fetching location from IP:', error)
      return GeoLocation.default()
    }
  }

  /**
   * ブラウザのGeolocation APIから現在地を取得
   */
  async getCurrentPosition(): Promise<GeoLocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords

            // 逆ジオコーディングで国名を取得
            const country = await this.reverseGeocode(latitude, longitude)

            const geoLocation =
              GeoLocation.create(latitude, longitude, country, this.language) ||
              GeoLocation.default()

            resolve(geoLocation)
          } catch (error) {
            console.error('Error processing geolocation data:', error)
            reject(error)
          }
        },
        (error) => {
          console.error('Geolocation error:', error)
          reject(new Error(`Geolocation error: ${error.message}`))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5分
        }
      )
    })
  }

  /**
   * 国コードを取得
   */
  async getCountryFromIP(): Promise<Country> {
    try {
      const geoLocation = await this.getLocationFromIpAddress()

      // 国名から国コードを推測
      const countryCode = this.getCountryCodeFromName(geoLocation.country)

      return (
        Country.create(countryCode, this.language).country || Country.default()
      )
    } catch (error) {
      console.error('Error getting country from IP:', error)
      return Country.default()
    }
  }

  /**
   * 逆ジオコーディングで国名を取得
   */
  private async reverseGeocode(
    latitude: number,
    longitude: number
  ): Promise<string> {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.countryName || 'Unknown'
    } catch (error) {
      console.error('Error in reverse geocoding:', error)
      return 'Unknown'
    }
  }

  /**
   * 国名から国コードを取得
   */
  private getCountryCodeFromName(countryName: string): string {
    const countryMap: Record<string, string> = {
      Japan: 'jp',
      'United States': 'us',
      France: 'fr',
      Germany: 'de',
      'United Kingdom': 'gb',
      China: 'cn',
      'South Korea': 'kr',
      Italy: 'it',
      Spain: 'es',
      Brazil: 'br',
      Australia: 'au',
      Canada: 'ca',
      India: 'in',
      Russia: 'ru',
      Mexico: 'mx'
    }

    return countryMap[countryName] || 'us'
  }
}
