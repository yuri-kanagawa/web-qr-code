import { GeoLocation } from '@/domains/valueObjects/geoLocation'

/**
 * 位置情報取得のためのリポジトリインターフェース
 */
export interface IGeoLocationRepository {
  /**
   * 現在の位置情報を取得
   * @returns GeoLocation - 取得した位置情報、失敗時はデフォルト位置
   */
  getCurrentLocation(): Promise<GeoLocation>
}

