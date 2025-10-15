/**
 * QRコードスキャン結果
 */
export interface QrScanResult {
  data: string
}

/**
 * QRコードスキャナーのリポジトリインターフェース
 */
export interface IQrScannerRepository {
  /**
   * 画像URLからQRコードをスキャンする（外部ライブラリ使用）
   * @param imageUrl - 画像のURL（ObjectURLまたはHTTP URL）
   * @returns QRコードのスキャン結果
   * @throws スキャンに失敗した場合
   */
  scanFromImageUrl(imageUrl: string): Promise<QrScanResult>
}

