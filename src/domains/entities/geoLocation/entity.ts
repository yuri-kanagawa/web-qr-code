import { Language } from '../../valueObjects/language'
import { Latitude } from '../../valueObjects/latitude'
import { Longitude } from '../../valueObjects/longitude'

/**
 * 地理位置情報を表すEntity
 * LatitudeとLongitudeを集約し、位置情報に関連するビジネスロジックを持つ
 */
export class GeoLocation {
  // デフォルト座標（東京）
  private static readonly DEFAULT_LATITUDE = 35.681236
  private static readonly DEFAULT_LONGITUDE = 139.767125
  private static readonly DEFAULT_COUNTRY = 'Japan'

  private readonly _latitude: Latitude
  private readonly _longitude: Longitude
  private readonly _country: string
  private readonly _language: Language

  private constructor(
    latitude: Latitude,
    longitude: Longitude,
    country: string,
    language: Language
  ) {
    this._latitude = latitude
    this._longitude = longitude
    this._country = country
    this._language = language
  }

  /**
   * 緯度・経度・国名から作成
   */
  static create(
    latitude: number,
    longitude: number,
    country: string,
    language: Language
  ): GeoLocation | null {
    const latResult = Latitude.create(latitude, language)
    const lngResult = Longitude.create(longitude, language)

    if (latResult.isFailure || lngResult.isFailure) {
      console.error('Failed to create GeoLocation:', {
        latError: latResult.error?.message,
        lngError: lngResult.error?.message
      })
      return null
    }

    return new GeoLocation(
      latResult.latitude!,
      lngResult.longitude!,
      country,
      language
    )
  }

  /**
   * LatitudeとLongitudeから作成
   */
  static fromValueObjects(
    latitude: Latitude,
    longitude: Longitude,
    country: string,
    language: Language
  ): GeoLocation {
    return new GeoLocation(latitude, longitude, country, language)
  }

  /**
   * デフォルト位置（東京）を返す
   */
  static default(): GeoLocation {
    const latitude = Latitude.create(
      GeoLocation.DEFAULT_LATITUDE,
      Language.default()
    ).latitude!
    const longitude = Longitude.create(
      GeoLocation.DEFAULT_LONGITUDE,
      Language.default()
    ).longitude!

    return new GeoLocation(
      latitude,
      longitude,
      GeoLocation.DEFAULT_COUNTRY,
      Language.default()
    )
  }

  /**
   * 東京の位置情報を返す
   */
  static tokyo(language: Language = Language.default()): GeoLocation {
    const latitude = Latitude.create(35.681236, language).latitude!
    const longitude = Longitude.create(139.767125, language).longitude!
    return new GeoLocation(
      latitude,
      longitude,
      language.isJapanese ? '日本' : 'Japan',
      language
    )
  }

  /**
   * ニューヨークの位置情報を返す
   */
  static newYork(language: Language = Language.default()): GeoLocation {
    const latitude = Latitude.create(40.712776, language).latitude!
    const longitude = Longitude.create(-74.005974, language).longitude!
    return new GeoLocation(
      latitude,
      longitude,
      language.isJapanese ? 'アメリカ' : 'United States',
      language
    )
  }

  /**
   * パリの位置情報を返す
   */
  static paris(language: Language = Language.default()): GeoLocation {
    const latitude = Latitude.create(48.856613, language).latitude!
    const longitude = Longitude.create(2.352222, language).longitude!
    return new GeoLocation(
      latitude,
      longitude,
      language.isJapanese ? 'フランス' : 'France',
      language
    )
  }

  get latitude(): number {
    return this._latitude.value
  }

  get longitude(): number {
    return this._longitude.value
  }

  get latitudeObject(): Latitude {
    return this._latitude
  }

  get longitudeObject(): Longitude {
    return this._longitude
  }

  get country(): string {
    return this._country
  }

  get language(): Language {
    return this._language
  }

  /**
   * Google Maps用のURL文字列を生成
   */
  get googleMapsUrl(): string {
    return `https://www.google.com/maps?q=${this.latitude},${this.longitude}`
  }

  /**
   * 2点間の距離を計算（km）
   * Haversine公式を使用
   */
  distanceTo(other: GeoLocation): number {
    const R = 6371 // 地球の半径（km）
    const dLat = this.toRad(other.latitude - this.latitude)
    const dLon = this.toRad(other.longitude - this.longitude)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(this.latitude)) *
        Math.cos(this.toRad(other.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private toRad(degrees: number): number {
    return (degrees * Math.PI) / 180
  }

  /**
   * 座標を文字列で表現
   */
  toString(): string {
    return `${this.latitude},${this.longitude}`
  }

  equals(other: GeoLocation): boolean {
    return (
      this._latitude.equals(other._latitude) &&
      this._longitude.equals(other._longitude) &&
      this._country === other._country
    )
  }
}
