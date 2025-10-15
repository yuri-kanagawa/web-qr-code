import { IQrScannerRepository } from '@/domains/repositories'
import { Language } from '@/domains/valueObjects/language'
import { Qr } from '@/domains/valueObjects/qr'

/**
 * ファイルからQRコードを読み取るユースケース
 */
export class ReadQrFromFileUseCase {
  constructor(private readonly qrScannerRepository: IQrScannerRepository) {}

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
      // QRコードをスキャン（外部リポジトリ使用）
      const result = await this.qrScannerRepository.scanFromImageUrl(objectUrl)

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
