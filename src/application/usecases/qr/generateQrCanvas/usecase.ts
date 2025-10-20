import { QrCode } from '@/domains/entities/qr'
import { IQrGeneratorRepository } from '@/domains/repositories/external/qrGenerator'
import { GenerateQrCanvasUseCaseResult } from './result'

/**
 * QRコードをCanvasに生成するユースケース
 */
export class GenerateQrCanvasUseCase {
  constructor(private readonly qrGeneratorRepository: IQrGeneratorRepository) {}

  /**
   * QRコードをCanvasに生成する
   *
   * @param qrCode - QRコードエンティティ
   * @returns Promise<GenerateQrCanvasUseCaseResult> - 生成結果
   */
  async execute(qrCode: QrCode): Promise<GenerateQrCanvasUseCaseResult> {
    try {
      const canvas = await this.qrGeneratorRepository.generateCanvas(qrCode)
      return GenerateQrCanvasUseCaseResult.ok(canvas)
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to generate QR code canvas'
      return GenerateQrCanvasUseCaseResult.fail(new Error(errorMessage))
    }
  }
}

