/**
 * 色変換ユーティリティ
 */
export class ColorUtils {
  /**
   * 16進数カラーコードをRGBに変換
   */
  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    if (!hex || hex === '') return null

    // 透過色の場合はnullを返す
    if (['transparent', 'rgba(0,0,0,0)'].includes(hex.toLowerCase())) {
      return null
    }

    // #を除去
    const cleanHex = hex.replace('#', '')

    // 3桁の場合は6桁に展開
    const fullHex =
      cleanHex.length === 3
        ? cleanHex
            .split('')
            .map((char) => char + char)
            .join('')
        : cleanHex

    // RGBに変換
    const r = parseInt(fullHex.substring(0, 2), 16)
    const g = parseInt(fullHex.substring(2, 4), 16)
    const b = parseInt(fullHex.substring(4, 6), 16)

    return { r, g, b }
  }

  /**
   * 2つのRGB色が同じかどうかを判定（許容誤差付き）
   */
  static isSameColor(
    color1: { r: number; g: number; b: number },
    color2: { r: number; g: number; b: number },
    tolerance: number = 10
  ): boolean {
    return (
      Math.abs(color1.r - color2.r) < tolerance &&
      Math.abs(color1.g - color2.g) < tolerance &&
      Math.abs(color1.b - color2.b) < tolerance
    )
  }
}
