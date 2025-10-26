import { GeoLocationRepository as IGeoLocationRepository } from '@/application/services/localeDetection/LocaleDetectionService'

export class GeoLocationRepository implements IGeoLocationRepository {
  async getCountryFromIP(): Promise<string | null> {
    try {
      // ipapi.coを使用してIPアドレスから国を取得
      const response = await fetch('https://ipapi.co/json/')
      if (!response.ok) {
        throw new Error('Failed to fetch location data')
      }

      const data = await response.json()
      return data.country_code?.toLowerCase() || null
    } catch (error) {
      console.warn('Failed to get country from IP:', error)
      return null
    }
  }
}
