import { GeoLocation } from '@/domains/entities/geoLocation'

/**
 * 位置情報取得のためのリポジトリインターフェース
 * サーバーサイド実装とクライアントサイド実装の両方をサポート
 */
export interface IGeoLocationRepository {
  /**
   * IPアドレスから位置情報を取得（外部API使用）
   * @returns GeoLocation - 取得した位置情報、失敗時はデフォルト位置
   */
  getLocationFromIpAddress(): Promise<GeoLocation>

  /**
   * ブラウザのGeolocation APIから現在地を取得
   * @returns GeoLocation - 取得した位置情報
   * @throws Error - 位置情報取得失敗時
   */
  getCurrentPosition(): Promise<GeoLocation>
}
