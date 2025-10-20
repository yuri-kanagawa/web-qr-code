import { QrCode } from '@/domains/entities/qr'
import { IQrGeneratorRepository } from '@/domains/repositories/external/qrGenerator'
import { IQrScannerRepository } from '@/domains/repositories/external/qrScanner'
import { Language } from '@/domains/valueObjects/language'
import { QrGenerationResult } from './types'

/**
 * QRコード生成を行うApplication層のサービス
 * Repositoryを直接使用してQRコード生成の可否を返す
 */
export class QrCodeGenerationService {
  constructor(
    private readonly qrGeneratorRepository: IQrGeneratorRepository,
    private readonly qrScannerRepository: IQrScannerRepository,
    private readonly language: Language = Language.default()
  ) {}

  /**
   * QRコードを生成して検証する
   */
  async generateAndValidateQrCode(qr: QrCode): Promise<QrGenerationResult> {
    try {
      console.log('🔍 QRコード生成と検証開始:', {
        content: qr.getContent(),
        size: qr.settings.size.value,
        ecLevel: qr.settings.ecLevel.value
      })

      // 1. QRコード生成
      const canvas = await this.qrGeneratorRepository.generateCanvas(qr)

      if (!canvas) {
        return {
          isSuccess: false,
          error: new Error('QRコード生成に失敗しました')
        }
      }

      console.log('✅ QRコード生成成功:', {
        width: canvas.width,
        height: canvas.height
      })

      // 3. 読み取り検証
      const dataUrl = canvas.toDataURL('image/png')
      const scanResult =
        await this.qrScannerRepository.scanFromImageUrl(dataUrl)

      const scannedContent = scanResult.data || ''
      console.log('📖 読み取り結果:', {
        expected: qr.getContent(),
        actual: scannedContent,
        isReadable: scannedContent === qr.getContent()
      })

      // 4. 読み取った内容と元の内容を比較
      const isReadable = scannedContent === qr.getContent()

      return {
        isSuccess: true,
        canvas: canvas,
        scanResult: {
          data: scannedContent,
          isReadable
        }
      }
    } catch (error) {
      console.error('❌ QRコード生成・検証エラー:', error)
      return {
        isSuccess: false,
        error: error instanceof Error ? error : new Error(String(error))
      }
    }
  }

  /**
   * QRコードを生成する（検証なし）
   */
  async generateQrCode(qr: QrCode): Promise<QrGenerationResult> {
    try {
      const canvas = await this.qrGeneratorRepository.generateCanvas(qr)

      if (!canvas) {
        return {
          isSuccess: false,
          error: new Error('QRコード生成に失敗しました')
        }
      }

      return {
        isSuccess: true,
        canvas: canvas
      }
    } catch (error) {
      return {
        isSuccess: false,
        error: error instanceof Error ? error : new Error(String(error))
      }
    }
  }
}
