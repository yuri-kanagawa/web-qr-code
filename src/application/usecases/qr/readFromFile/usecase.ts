import { IQrScannerRepository } from '@/domains/repositories'
import { Language } from '@/domains/valueObjects/language'
import { Qr } from '@/domains/valueObjects/qr'
import { ReadQrFromFileUseCaseResult } from './result'

/**
 * ファイルからQRコードを読み取るユースケース
 */
export class ReadQrFromFileUseCase {
  constructor(
    private readonly qrScannerRepository: IQrScannerRepository,
    private readonly language: Language
  ) {}

  /**
   * ファイルからQRコードを読み取る
   * @param file - 読み取り対象のファイル
   * @returns ReadQrFromFileUseCaseResult - 成功/失敗の結果
   */
  async execute(file: File): Promise<ReadQrFromFileUseCaseResult> {
    // ファイルからObjectURLを生成
    const objectUrl = URL.createObjectURL(file)

    try {
      // QRコードをスキャン（外部リポジトリ使用）
      const result = await this.qrScannerRepository.scanFromImageUrl(objectUrl)

      // QRコードのバリューオブジェクトを作成
      const qrResult = Qr.create(result.data, this.language)

      if (qrResult.isFailure || !qrResult.qr) {
        return ReadQrFromFileUseCaseResult.fail(
          new Error(qrResult.error?.message || 'Invalid QR code')
        )
      }

      return ReadQrFromFileUseCaseResult.ok(qrResult.qr)
    } catch (error) {
      // スキャンエラーをキャッチして結果オブジェクトに変換
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to scan QR code'
      return ReadQrFromFileUseCaseResult.fail(new Error(errorMessage))
    } finally {
      // ObjectURLを解放
      URL.revokeObjectURL(objectUrl)
    }
  }
}
