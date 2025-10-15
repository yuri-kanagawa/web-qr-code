import { GeoLocation } from '@/domains/valueObjects/geoLocation'

/**
 * 位置情報取得のためのリポジトリインターフェース
 */
export interface IGeoLocationRepository {
  /**
   * IPアドレスから位置情報を取得（外部API使用）
   * @returns GeoLocation - 取得した位置情報、失敗時はデフォルト位置
   */
  getLocationFromIpAddress(): Promise<GeoLocation>
}
