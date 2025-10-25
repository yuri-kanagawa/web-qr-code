import { GeoLocation } from '@/domains/entities/geoLocation'
import { IGeoLocationRepository } from '@/domains/repositories/external/geoLocation'
import { Language } from '@/domains/valueObjects/language'

/**
 * ブラウザのGeolocation APIを使用した位置情報取得の実装（クライアントサイドのみ）
 */
export class BrowserGeoLocationRepository implements IGeoLocationRepository {
  private readonly language: Language

  constructor(language: Language) {
    this.language = language
  }

  async getLocationFromIpAddress(): Promise<GeoLocation> {
    const errorMessage = this.language.isJapanese
      ? 'BrowserGeoLocationRepositoryはIPベースの位置情報をサポートしていません'
      : 'BrowserGeoLocationRepository does not support IP-based location'
    throw new Error(errorMessage)
  }

  async getCurrentPosition(): Promise<GeoLocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const errorMessage = this.language.isJapanese
          ? 'このブラウザでは位置情報がサポートされていません。'
          : 'Geolocation is not supported by this browser.'
        reject(new Error(errorMessage))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const geoLocation = GeoLocation.create(
            position.coords.latitude,
            position.coords.longitude,
            '', // ブラウザAPIでは国名は取得できない
            this.language
          )

          if (geoLocation) {
            resolve(geoLocation)
          } else {
            const errorMessage = this.language.isJapanese
              ? 'GeoLocationの作成に失敗しました'
              : 'Failed to create GeoLocation'
            reject(new Error(errorMessage))
          }
        },
        (error) => {
          const errorMessage = this.language.isJapanese
            ? '位置情報の取得に失敗しました。'
            : 'Failed to get current position.'
          reject(new Error(errorMessage))
        }
      )
    })
  }
}
