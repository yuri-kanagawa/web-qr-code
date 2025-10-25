import { QrCode } from '@/domains/entities/qr'

/**
 * ロゴ処理を担当するクラス
 */
export class LogoProcessor {
  /**
   * Canvasにロゴを追加
   */
  static async addLogoToCanvas(
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
          img.src = URL.createObjectURL(qrCode.settings.logoFile as File)
        }
      )

      const logoWidth = qrCode.settings.logo.width!
      const logoHeight = qrCode.settings.logo.height!
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
