import { Language } from '@/domains/valueObjects/language'
import { GeoLocationError } from './error'
import { GeoLocationResult } from './result'

export class GeoLocation {
  private static readonly MIN_LATITUDE = -90
  private static readonly MAX_LATITUDE = 90
  private static readonly MIN_LONGITUDE = -180
  private static readonly MAX_LONGITUDE = 180

  // デフォルト座標（東京）
  private static readonly DEFAULT_LATITUDE = 35.681236
  private static readonly DEFAULT_LONGITUDE = 139.767125
  private static readonly DEFAULT_COUNTRY = 'Japan'

  private readonly _latitude: number
  private readonly _longitude: number
  private readonly _country: string
  private readonly _language: Language

  private constructor(
    latitude: number,
    longitude: number,
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
   * @param latitude - 緯度（-90 ~ 90）
   * @param longitude - 経度（-180 ~ 180）
   * @param country - 国名
   * @param language - 言語設定
   */
  static create(
    latitude: number,
    longitude: number,
    country: string,
    language: Language
  ): GeoLocationResult {
    // 緯度のバリデーション
    if (
      latitude < GeoLocation.MIN_LATITUDE ||
      latitude > GeoLocation.MAX_LATITUDE
    ) {
      const errorMessage = language.isJapanese
        ? `緯度は${GeoLocation.MIN_LATITUDE}から${GeoLocation.MAX_LATITUDE}の範囲で指定してください`
        : language.isFrench
          ? `La latitude doit être comprise entre ${GeoLocation.MIN_LATITUDE} et ${GeoLocation.MAX_LATITUDE}`
          : `Latitude must be between ${GeoLocation.MIN_LATITUDE} and ${GeoLocation.MAX_LATITUDE}`
      return new GeoLocationResult(null, new GeoLocationError(errorMessage))
    }

    // 経度のバリデーション
    if (
      longitude < GeoLocation.MIN_LONGITUDE ||
      longitude > GeoLocation.MAX_LONGITUDE
    ) {
      const errorMessage = language.isJapanese
        ? `経度は${GeoLocation.MIN_LONGITUDE}から${GeoLocation.MAX_LONGITUDE}の範囲で指定してください`
        : language.isFrench
          ? `La longitude doit être comprise entre ${GeoLocation.MIN_LONGITUDE} et ${GeoLocation.MAX_LONGITUDE}`
          : `Longitude must be between ${GeoLocation.MIN_LONGITUDE} and ${GeoLocation.MAX_LONGITUDE}`
      return new GeoLocationResult(null, new GeoLocationError(errorMessage))
    }

    return new GeoLocationResult(
      new GeoLocation(latitude, longitude, country, language),
      null
    )
  }

  /**
   * デフォルト位置（東京）を返す
   */
  static default(): GeoLocation {
    return new GeoLocation(
      GeoLocation.DEFAULT_LATITUDE,
      GeoLocation.DEFAULT_LONGITUDE,
      GeoLocation.DEFAULT_COUNTRY,
      Language.default()
    )
  }

  /**
   * 東京の位置情報を返す
   */
  static tokyo(language: Language = Language.default()): GeoLocation {
    return new GeoLocation(
      35.681236,
      139.767125,
      language.isJapanese ? '日本' : 'Japan',
      language
    )
  }

  /**
   * ニューヨークの位置情報を返す
   */
  static newYork(language: Language = Language.default()): GeoLocation {
    return new GeoLocation(
      40.712776,
      -74.005974,
      language.isJapanese ? 'アメリカ' : 'United States',
      language
    )
  }

  /**
   * パリの位置情報を返す
   */
  static paris(language: Language = Language.default()): GeoLocation {
    return new GeoLocation(
      48.856613,
      2.352222,
      language.isJapanese
        ? 'フランス'
        : language.isFrench
          ? 'France'
          : 'France',
      language
    )
  }

  get latitude(): number {
    return this._latitude
  }

  get longitude(): number {
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
    return `https://www.google.com/maps?q=${this._latitude},${this._longitude}`
  }

  /**
   * 2点間の距離を計算（km）
   * Haversine公式を使用
   */
  distanceTo(other: GeoLocation): number {
    const R = 6371 // 地球の半径（km）
    const dLat = this.toRad(other._latitude - this._latitude)
    const dLon = this.toRad(other._longitude - this._longitude)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(this._latitude)) *
        Math.cos(this.toRad(other._latitude)) *
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
    return `${this._latitude},${this._longitude}`
  }

  equals(other: GeoLocation): boolean {
    return (
      this._latitude === other._latitude &&
      this._longitude === other._longitude &&
      this._country === other._country
    )
  }
}
