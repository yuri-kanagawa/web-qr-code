import QrScanner from 'qr-scanner'
import { Language } from '@/domains/valueObjects/language'
import { Qr } from '@/domains/valueObjects/qr'

/**
 * ファイルからQRコードを読み取るユースケース
 */
export class ReadQrFromFileUseCase {
  /**
   * ファイルからQRコードを読み取る
   * @param file - 読み取り対象のファイル
   * @param language - 言語設定
   * @returns 成功時はQrオブジェクト、失敗時はnull
   * @throws QrScannerのエラー、バリデーションエラー
   */
  async execute(file: File, language: Language): Promise<Qr> {
    // ファイルからObjectURLを生成
    const objectUrl = URL.createObjectURL(file)

    try {
      // QRコードをスキャン
      const result = await QrScanner.scanImage(objectUrl, {
        returnDetailedScanResult: true
      })

      // QRコードのバリューオブジェクトを作成
      const qrResult = Qr.create(result.data, language)

      if (qrResult.isFailure || !qrResult.qr) {
        throw new Error(qrResult.error?.message || 'Invalid QR code')
      }

      return qrResult.qr
    } finally {
      // ObjectURLを解放
      URL.revokeObjectURL(objectUrl)
    }
  }
}

