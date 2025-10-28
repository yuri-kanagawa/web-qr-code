import { QrCodeGenerationService } from '@/application/services/qr/QrCodeGeneration/service'
import { QrCode } from '@/domains/entities/qr'
import { IQrGeneratorRepository } from '@/domains/repositories/external/qrGenerator'
import { IQrScannerRepository } from '@/domains/repositories/external/qrScanner'
import { Language } from '@/domains/valueObjects/language'
import { DownloadQrCodeUseCaseResult } from './result'

/**
 * QRコードをダウンロードするユースケース
 */
export class DownloadQrCodeUseCase {
  private qrCodeGenerationService: QrCodeGenerationService

  constructor(
    private readonly qrGeneratorRepository: IQrGeneratorRepository,
    private readonly qrScannerRepository: IQrScannerRepository,
    private readonly language: Language = Language.default()
  ) {
    this.qrCodeGenerationService = new QrCodeGenerationService(
      this.qrGeneratorRepository,
      this.qrScannerRepository,
      this.language
    )
  }

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
      // Serviceを使用してQRコード生成（ユーザー設定のサイズをそのまま使用）
      const result = await this.qrCodeGenerationService.generateQrCode(qrCode)

      if (!result.isSuccess || !result.canvas) {
        return DownloadQrCodeUseCaseResult.fail(
          result.error || new Error('QRコード生成に失敗しました')
        )
      }

      // ファイル名を生成
      const downloadFileName = fileName || this.generateFileName()

      // DataURLを生成
      const dataUrl = result.canvas.toDataURL('image/png')

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
