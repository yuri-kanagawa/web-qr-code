import { QrCode } from '@/domains/entities/qr'

/**
 * SVG処理を担当するクラス
 */
export class SvgProcessor {
  /**
   * SVGの背景を透過にする
   */
  static fixTransparentBackground(svgElement: SVGElement): void {
    try {
      console.log('=== SVG透過背景修正開始 ===')

      // SVGの全てのrect要素を取得
      const allRects = svgElement.querySelectorAll('rect')
      console.log('SVGのrect要素数:', allRects.length)

      const width = svgElement.getAttribute('width')
      const height = svgElement.getAttribute('height')
      console.log('SVGサイズ:', width, 'x', height)

      // 背景rectを探して削除
      allRects.forEach((rect, index) => {
        const x = rect.getAttribute('x')
        const y = rect.getAttribute('y')
        const rectWidth = rect.getAttribute('width')
        const rectHeight = rect.getAttribute('height')
        const fill = rect.getAttribute('fill')

        console.log(`Rect ${index}:`, {
          x,
          y,
          width: rectWidth,
          height: rectHeight,
          fill
        })

        // 背景rectが全画面をカバーしている場合
        if (
          x === '0' &&
          y === '0' &&
          rectWidth === width &&
          rectHeight === height
        ) {
          console.log('背景rectを削除:', {
            x,
            y,
            width: rectWidth,
            height: rectHeight,
            fill
          })
          // rectを削除する代わりに、fillをnoneに設定
          rect.setAttribute('fill', 'none')
        }
      })

      // SVGの背景色を透過に設定
      svgElement.setAttribute('style', 'background: transparent')
      console.log('=== SVG透過背景修正完了 ===')
    } catch (error) {
      console.warn('SVG transparent background修正エラー:', error)
    }
  }

  /**
   * SVGのeyeColorを修正する
   */
  static fixEyeColors(svgElement: SVGElement, colors: any): void {
    try {
      // 左上の目（eye1）
      const eye1Elements = svgElement.querySelectorAll('[data-eye="1"]')
      eye1Elements.forEach((element) => {
        if (element instanceof SVGElement) {
          element.setAttribute('fill', colors.eyeColor1.value)
        }
      })

      // 右上の目（eye2）
      const eye2Elements = svgElement.querySelectorAll('[data-eye="2"]')
      eye2Elements.forEach((element) => {
        if (element instanceof SVGElement) {
          element.setAttribute('fill', colors.eyeColor2.value)
        }
      })

      // 左下の目（eye3）
      const eye3Elements = svgElement.querySelectorAll('[data-eye="3"]')
      eye3Elements.forEach((element) => {
        if (element instanceof SVGElement) {
          element.setAttribute('fill', colors.eyeColor3.value)
        }
      })

      // より詳細なセレクタでeyeColorを修正
      const allRects = svgElement.querySelectorAll('rect')
      allRects.forEach((rect) => {
        const fill = rect.getAttribute('fill')
        if (fill === colors.fgColor.value) {
          // 位置に基づいてeyeColorを判定
          const x = parseFloat(rect.getAttribute('x') || '0')
          const y = parseFloat(rect.getAttribute('y') || '0')
          const width = parseFloat(rect.getAttribute('width') || '0')
          const height = parseFloat(rect.getAttribute('height') || '0')

          // 目の部分の判定（簡易的な実装）
          if (this.isEyePattern(x, y, width, height, svgElement)) {
            const eyeColor = this.determineEyeColor(x, y, svgElement, colors)
            rect.setAttribute('fill', eyeColor)
          }
        }
      })
    } catch (error) {
      console.warn('SVG eyeColor修正エラー:', error)
    }
  }

  /**
   * 指定された位置が目のパターンかどうかを判定
   */
  private static isEyePattern(
    x: number,
    y: number,
    width: number,
    height: number,
    svgElement: SVGElement
  ): boolean {
    const svgWidth = parseFloat(svgElement.getAttribute('width') || '0')
    const svgHeight = parseFloat(svgElement.getAttribute('height') || '0')

    // 目のパターンは通常、QRコードの角に位置する
    const margin = svgWidth * 0.1 // 10%のマージン

    return (
      (x < margin && y < margin) || // 左上
      (x > svgWidth - margin && y < margin) || // 右上
      (x < margin && y > svgHeight - margin) // 左下
    )
  }

  /**
   * 位置に基づいてeyeColorを決定
   */
  private static determineEyeColor(
    x: number,
    y: number,
    svgElement: SVGElement,
    colors: any
  ): string {
    const svgWidth = parseFloat(svgElement.getAttribute('width') || '0')
    const svgHeight = parseFloat(svgElement.getAttribute('height') || '0')
    const margin = svgWidth * 0.1

    if (x < margin && y < margin) {
      return colors.eyeColor1.value // 左上
    } else if (x > svgWidth - margin && y < margin) {
      return colors.eyeColor2.value // 右上
    } else if (x < margin && y > svgHeight - margin) {
      return colors.eyeColor3.value // 左下
    }

    return colors.fgColor.value // デフォルト
  }
}
