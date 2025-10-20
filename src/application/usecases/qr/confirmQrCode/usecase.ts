import { QrCodeGenerationService } from '@/application/services/qr/QrCodeGeneration/service'
import { QrCode } from '@/domains/entities/qr'
import { IQrGeneratorRepository } from '@/domains/repositories/external/qrGenerator'
import { IQrScannerRepository } from '@/domains/repositories/external/qrScanner'
import { Language } from '@/domains/valueObjects/language'
import { ConfirmQrCodeResult } from './result'

export class ConfirmQrCodeUseCase {
  constructor(
    private readonly qrGeneratorRepository: IQrGeneratorRepository,
    private readonly qrScannerRepository: IQrScannerRepository,
    private readonly language: Language = Language.default()
  ) {}

  async execute(qr: QrCode): Promise<ConfirmQrCodeResult> {
    // Serviceのインスタンスを生成
    const qrCodeGenerationService = new QrCodeGenerationService(
      this.qrGeneratorRepository,
      this.qrScannerRepository,
      this.language
    )

    // 1. QRコード生成と検証
    const generationResult =
      await qrCodeGenerationService.generateAndValidateQrCode(qr)

    return {
      isSuccess: generationResult.isSuccess,
      canvas: generationResult.canvas,
      scanResult: generationResult.scanResult,
      error: generationResult.error
    }
  }
}
