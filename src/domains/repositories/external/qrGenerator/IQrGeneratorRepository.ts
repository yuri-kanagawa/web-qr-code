import { QrCode } from '@/domains/entities/qr'

/**
 * QRコード生成リポジトリのインターフェース
 */
export interface IQrGeneratorRepository {
  /**
   * QRコードをCanvasに生成する
   *
   * @param qrCode - QRコードエンティティ
   * @returns Promise<HTMLCanvasElement> - 生成されたCanvas
   * @throws Error - 生成に失敗した場合
   */
  generateCanvas(qrCode: QrCode): Promise<HTMLCanvasElement>
}
