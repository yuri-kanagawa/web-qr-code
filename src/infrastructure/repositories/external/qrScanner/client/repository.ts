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
    const result = await QrScanner.scanImage(imageUrl, {
      returnDetailedScanResult: true
    })

    return {
      data: result.data
    }
  }
}
