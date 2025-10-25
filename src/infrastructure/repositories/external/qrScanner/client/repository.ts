import {
  IQrScannerRepository,
  QrScanResult
} from '@/domains/repositories/external/qrScanner'
import { Language } from '@/domains/valueObjects/language'
import QrScanner from 'qr-scanner'

/**
 * qr-scannerライブラリを使用したQRコードスキャナーの実装
 */
export class QrScannerRepository implements IQrScannerRepository {
  private readonly language: Language

  constructor(language: Language) {
    this.language = language
  }
  async scanFromImageUrl(imageUrl: string): Promise<QrScanResult> {
    try {
      console.log('QRスキャン開始:', { imageUrlLength: imageUrl.length })

      // 画像のサイズを事前にチェック
      const imageSize = await this.getImageSize(imageUrl)
      console.log('画像サイズ:', imageSize)

      // 明らかに小さすぎる場合は早期にエラーを返す
      if (imageSize.width < 50 || imageSize.height < 50) {
        console.warn('画像サイズが小さすぎます:', imageSize)
        const errorMessage = this.language.isJapanese
          ? `QRコードのサイズが小さすぎます (${imageSize.width}x${imageSize.height}px)。読み取りに失敗する可能性があります。`
          : `QR code size is too small (${imageSize.width}x${imageSize.height}px). Reading may fail.`
        throw new Error(errorMessage)
      }

      // オプションなしでシンプルに実行
      const result = await QrScanner.scanImage(imageUrl)

      console.log('QRスキャン結果:', {
        result: result,
        resultType: typeof result
      })

      // QrScanner.scanImage()は文字列を返す
      if (typeof result === 'string') {
        return { data: result }
      } else {
        console.error('予期しないQRスキャン結果構造:', result)
        const errorMessage = this.language.isJapanese
          ? '無効なQRスキャン結果構造です'
          : 'Invalid QR scan result structure'
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error('QRスキャンエラー詳細:', {
        error,
        errorType: typeof error,
        errorMessage: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
        imageUrlLength: imageUrl.length
      })
      throw error
    }
  }

  /**
   * 画像のサイズを取得する
   */
  private async getImageSize(
    imageUrl: string
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = () => {
        const errorMessage = this.language.isJapanese
          ? '画像の読み込みに失敗しました'
          : 'Failed to load image'
        reject(new Error(errorMessage))
      }
      img.src = imageUrl
    })
  }
}
