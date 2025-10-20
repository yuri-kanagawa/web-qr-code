import {
  IQrScannerRepository,
  QrScanResult
} from '@/domains/repositories/external/qrScanner'
import QrScanner from 'qr-scanner'

/**
 * qr-scannerライブラリを使用したQRコードスキャナーの実装
 */
export class QrScannerRepository implements IQrScannerRepository {
  async scanFromImageUrl(imageUrl: string): Promise<QrScanResult> {
    try {
      console.log('QRスキャン開始:', { imageUrlLength: imageUrl.length })

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
        throw new Error('Invalid QR scan result structure')
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
}
