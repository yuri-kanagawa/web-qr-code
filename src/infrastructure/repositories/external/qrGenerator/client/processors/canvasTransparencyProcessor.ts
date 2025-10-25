import { QrCode } from '@/domains/entities/qr'
import { ColorUtils } from '../utils/colorUtils'

/**
 * Canvas透過処理を担当するクラス
 */
export class CanvasTransparencyProcessor {
  /**
   * Canvasの透過処理を実行
   */
  static processTransparency(canvas: HTMLCanvasElement, qrCode: QrCode): void {
    if (!qrCode.settings.colors.bgColor.isTransparent()) {
      return
    }

    console.log('Canvas透過処理開始 - 背景色透過')

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // 前景色を取得
    const fgColorRgb = ColorUtils.hexToRgb(qrCode.settings.colors.fgColor.value)

    // 目の色を取得
    const eyeColor1Rgb = ColorUtils.hexToRgb(
      qrCode.settings.colors.eyeColor1.value
    )
    const eyeColor2Rgb = ColorUtils.hexToRgb(
      qrCode.settings.colors.eyeColor2.value
    )
    const eyeColor3Rgb = ColorUtils.hexToRgb(
      qrCode.settings.colors.eyeColor3.value
    )

    // react-qrcode-logoが透過背景の場合、実際には白(#ffffff)で描画される
    const bgColor = { r: 255, g: 255, b: 255 }

    // 全てのピクセルをチェック
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      // 白い背景かどうかをチェック
      const isWhiteBackground = ColorUtils.isSameColor({ r, g, b }, bgColor)

      // 前景色と一致するピクセルかどうかをチェック
      const isForegroundColor =
        fgColorRgb && ColorUtils.isSameColor({ r, g, b }, fgColorRgb)

      // 目の色と一致するピクセルかどうかをチェック
      const isEyeColor =
        (eyeColor1Rgb && ColorUtils.isSameColor({ r, g, b }, eyeColor1Rgb)) ||
        (eyeColor2Rgb && ColorUtils.isSameColor({ r, g, b }, eyeColor2Rgb)) ||
        (eyeColor3Rgb && ColorUtils.isSameColor({ r, g, b }, eyeColor3Rgb))

      // 白い背景であり、前景色でも目の色でもない場合のみ透過にする
      if (isWhiteBackground && !isForegroundColor && !isEyeColor) {
        // 白い部分を透過にする
        data[i + 3] = 0 // アルファチャンネルを0に設定（透過）
      }
    }

    ctx.putImageData(imageData, 0, 0)
    console.log('Canvas透過処理完了 - 白い背景のみ透過')
  }
}
