import { QrCode } from '@/domains/entities/qr'
import { IQrGeneratorRepository } from '@/domains/repositories/external/qrGenerator'
import QRCode from 'qrcode'

/**
 * QRコード生成リポジトリの実装（クライアントサイド）
 */
export class QrGeneratorRepository implements IQrGeneratorRepository {
  async generateCanvas(qrCode: QrCode): Promise<HTMLCanvasElement> {
    if (
      !qrCode.isValid() ||
      qrCode.qrValue.value === '' ||
      qrCode.qrValue.value.trim() === ''
    ) {
      throw new Error('Invalid QR code data')
    }

    // サイズチェック（75px未満は必ずエラー）
    if (qrCode.settings.size.value < 75) {
      throw new Error(
        `QRコードのサイズが小さすぎます（${qrCode.settings.size.value}px）。75px以上にしてください。`
      )
    }

    try {
      const canvas = document.createElement('canvas')
      const size = qrCode.settings.size.value
      const quietZone = qrCode.settings.quietZone || 4

      console.log('QRコード生成設定:', {
        size: size,
        quietZone: quietZone
      })

      // QRコードを生成
      await this.generateQrCodeCanvas(canvas, qrCode, size, quietZone)

      // ロゴがある場合は追加
      if (
        qrCode.settings.logoFile &&
        qrCode.settings.logo.width > 0 &&
        qrCode.settings.logo.height > 0
      ) {
        await this.addLogoToCanvas(canvas, qrCode, size)
      }

      return canvas
    } catch (error) {
      console.error('QRコード生成エラー:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`Failed to generate QR code canvas: ${errorMessage}`)
    }
  }

  private async generateQrCodeCanvas(
    canvas: HTMLCanvasElement,
    qrCode: QrCode,
    size: number,
    quietZone: number
  ): Promise<void> {
    // QRCodeライブラリを使用してCanvas生成
    await QRCode.toCanvas(canvas, qrCode.qrValue.value, {
      width: size,
      margin: quietZone,
      color: {
        dark: qrCode.settings.colors.fgColor.value,
        light: qrCode.settings.colors.bgColor.value
      },
      errorCorrectionLevel: qrCode.settings.ecLevel.value.toLowerCase() as any
    })
  }

  private async addLogoToCanvas(
    canvas: HTMLCanvasElement,
    qrCode: QrCode,
    canvasSize: number
  ): Promise<void> {
    if (!qrCode.settings.logoFile) return

    try {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // ロゴ画像を読み込み
      const logoImage = await new Promise<HTMLImageElement>(
        (resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve(img)
          img.onerror = reject
          img.src = URL.createObjectURL(qrCode.settings.logoFile)
        }
      )

      const logoWidth = qrCode.settings.logo.width
      const logoHeight = qrCode.settings.logo.height
      const logoX = (canvasSize - logoWidth) / 2
      const logoY = (canvasSize - logoHeight) / 2

      // ロゴの背景（白い四角）を描画
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(logoX - 2, logoY - 2, logoWidth + 4, logoHeight + 4)

      // ロゴの透明度を設定
      ctx.globalAlpha = qrCode.settings.logo.opacity ?? 1.0

      // ロゴを描画
      ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight)

      // 透明度をリセット
      ctx.globalAlpha = 1.0

      // オブジェクトURLを解放
      URL.revokeObjectURL(logoImage.src)
    } catch (error) {
      console.error('ロゴ追加エラー:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`Failed to add logo to canvas: ${errorMessage}`)
    }
  }
}
