import { QrCode } from '@/domains/entities/qr'
import { IQrGeneratorRepository } from '@/domains/repositories/external/qrGenerator'
import { DownloadQrCodeUseCaseResult } from './result'

/**
 * QRコードをダウンロードするユースケース
 */
export class DownloadQrCodeUseCase {
  constructor(private readonly qrGeneratorRepository: IQrGeneratorRepository) {}

  /**
   * QRコードを高解像度で生成してダウンロード用のDataURLを取得
   *
   * @param qrCode - QRコードエンティティ
   * @param fileName - ダウンロードファイル名（デフォルト: タイムスタンプ付き）
   * @returns Promise<DownloadQrCodeUseCaseResult> - ダウンロード結果
   */
  async execute(
    qrCode: QrCode,
    fileName?: string
  ): Promise<DownloadQrCodeUseCaseResult> {
    try {
      // 高解像度用にQrCodeの設定を一時変更
      const highResQrCode = qrCode.updateSettings((settings) =>
        settings.changeSize(1000)
      )

      const canvas =
        await this.qrGeneratorRepository.generateCanvas(highResQrCode)

      // ファイル名を生成
      const downloadFileName = fileName || this.generateFileName()

      // DataURLを生成
      const dataUrl = canvas.toDataURL('image/png')

      return DownloadQrCodeUseCaseResult.ok(dataUrl, downloadFileName)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to download QR code'
      return DownloadQrCodeUseCaseResult.fail(new Error(errorMessage))
    }
  }

  private generateFileName(): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    return `qr-code-${timestamp}.png`
  }
}

