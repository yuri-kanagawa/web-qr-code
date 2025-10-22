import { QrCode } from '@/domains/entities/qr'
import { IQrGeneratorRepository } from '@/domains/repositories/external/qrGenerator'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { QRCode } from 'react-qrcode-logo'

/**
 * QRコード生成リポジトリの実装（クライアントサイド）
 */
export class QrGeneratorRepository implements IQrGeneratorRepository {
  async generateCanvas(qrCode: QrCode): Promise<HTMLCanvasElement> {
    console.log('=== QrGeneratorRepository.generateCanvas 開始 ===')

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

      // Canvasのサイズを設定
      canvas.width = size
      canvas.height = size

      console.log('QRコード生成設定:', {
        size: size,
        quietZone: quietZone,
        eyeColor1: qrCode.settings.colors.eyeColor1.value,
        eyeColor2: qrCode.settings.colors.eyeColor2.value,
        eyeColor3: qrCode.settings.colors.eyeColor3.value
      })

      // QRコードを生成
      await this.generateQrCodeCanvas(canvas, qrCode, size, quietZone)

      // ロゴがある場合は追加
      if (
        qrCode.settings.logoFile &&
        qrCode.settings.logo.width !== undefined &&
        qrCode.settings.logo.height !== undefined &&
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
    console.log('=== generateQrCodeCanvas 開始 ===')
    console.log('eyeColor設定:', {
      eyeColor1: qrCode.settings.colors.eyeColor1.value,
      eyeColor2: qrCode.settings.colors.eyeColor2.value,
      eyeColor3: qrCode.settings.colors.eyeColor3.value
    })

    // react-qrcode-logoを使用してCanvas生成（プレビューと同じライブラリ）
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    container.style.top = '-9999px'
    document.body.appendChild(container)

    const root = createRoot(container)

    return new Promise<void>((resolve, reject) => {
      const eyeColorArray = [
        qrCode.settings.colors.eyeColor1.value,
        qrCode.settings.colors.eyeColor2.value,
        qrCode.settings.colors.eyeColor3.value
      ]

      console.log('=== QRCodeコンポーネントに渡すプロパティ ===')
      console.log({
        value: qrCode.qrValue.value,
        size: size,
        bgColor: qrCode.settings.colors.bgColor.value,
        fgColor: qrCode.settings.colors.fgColor.value,
        eyeColor: eyeColorArray,
        eyeRadius: [
          qrCode.settings.eye.radius1,
          qrCode.settings.eye.radius2,
          qrCode.settings.eye.radius3
        ],
        ecLevel: qrCode.settings.ecLevel.value.toLowerCase(),
        quietZone: quietZone
      })

      console.log('=== React.createElement 実行前 ===')
      console.log('QRCode:', QRCode)

      let qrComponent
      try {
        qrComponent = React.createElement(QRCode, {
          value: qrCode.qrValue.value,
          size: size,
          bgColor: qrCode.settings.colors.bgColor.value,
          fgColor: qrCode.settings.colors.fgColor.value,
          eyeColor: eyeColorArray,
          eyeRadius: [
            qrCode.settings.eye.radius1,
            qrCode.settings.eye.radius2,
            qrCode.settings.eye.radius3
          ],
          ecLevel: qrCode.settings.ecLevel.value as 'L' | 'M' | 'Q' | 'H',
          quietZone: quietZone
        })
        console.log('=== React.createElement 実行後 ===')
      } catch (error) {
        console.error('=== React.createElement エラー ===')
        console.error(error)
        document.body.removeChild(container)
        reject(error)
        return
      }

      console.log('=== root.render 実行前 ===')
      console.log('qrComponent:', qrComponent)

      try {
        root.render(qrComponent)
        console.log('=== root.render 実行後 ===')
      } catch (error) {
        console.error('=== root.render エラー ===')
        console.error(error)
        document.body.removeChild(container)
        reject(error)
        return
      }

      console.log('=== QRCodeコンポーネントをレンダリング完了 ===')
      console.log('container:', container)
      console.log('container.children:', container.children)

      // SVGの読み込みを待つ
      let attempts = 0
      const maxAttempts = 100 // 最大10秒待つ

      const checkForSvg = () => {
        console.log(
          'checkForSvg attempt:',
          attempts,
          'container.children.length:',
          container.children.length
        )

        // Canvasが生成されているか確認
        const canvasElement = container.querySelector('canvas')
        if (canvasElement) {
          console.log('=== Canvas生成完了 ===')
          try {
            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height)
              ctx.drawImage(canvasElement, 0, 0, canvas.width, canvas.height)
              document.body.removeChild(container)
              root.unmount()
              resolve()
            } else {
              reject(new Error('Failed to get canvas context'))
            }
          } catch (error) {
            console.error('Canvas processing error:', error)
            document.body.removeChild(container)
            root.unmount()
            reject(error)
          }
          return
        }

        const svgElement = container.querySelector('svg')
        if (svgElement) {
          try {
            console.log('=== SVG生成完了 ===')

            // SVGのスタイルを確認・修正
            this.fixSvgEyeColors(svgElement, qrCode.settings.colors)

            const svgData = new XMLSerializer().serializeToString(svgElement)

            console.log('=== 生成されたSVGの内容 ===')
            console.log(svgData)

            // eyeColorが含まれているかチェック
            console.log('=== eyeColorの確認 ===')
            console.log(
              'eyeColor1 (' +
                qrCode.settings.colors.eyeColor1.value +
                ') が含まれている:',
              svgData.includes(qrCode.settings.colors.eyeColor1.value)
            )
            console.log(
              'eyeColor2 (' +
                qrCode.settings.colors.eyeColor2.value +
                ') が含まれている:',
              svgData.includes(qrCode.settings.colors.eyeColor2.value)
            )
            console.log(
              'eyeColor3 (' +
                qrCode.settings.colors.eyeColor3.value +
                ') が含まれている:',
              svgData.includes(qrCode.settings.colors.eyeColor3.value)
            )
            const img = new Image()
            img.onload = () => {
              const ctx = canvas.getContext('2d')
              if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                document.body.removeChild(container)
                root.unmount()
                resolve()
              } else {
                reject(new Error('Failed to get canvas context'))
              }
            }
            img.onerror = (error) => {
              console.error('Image load error:', error)
              document.body.removeChild(container)
              root.unmount()
              reject(new Error('Failed to load SVG image'))
            }
            img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
          } catch (error) {
            console.error('SVG processing error:', error)
            document.body.removeChild(container)
            root.unmount()
            reject(error)
          }
        } else {
          attempts++
          if (attempts >= maxAttempts) {
            console.error('SVG generation timeout after', attempts, 'attempts')
            document.body.removeChild(container)
            root.unmount()
            reject(new Error('SVG generation timeout'))
          } else {
            // SVGがまだ生成されていない場合は少し待って再試行
            setTimeout(checkForSvg, 100)
          }
        }
      }

      // 少し待ってからSVGの存在をチェック
      setTimeout(checkForSvg, 500)
    })
  }

  /**
   * SVGのeyeColorを修正する
   * react-qrcode-logoのSVG出力でeyeColorが正しく反映されない場合の修正
   */
  private fixSvgEyeColors(svgElement: SVGElement, colors: any): void {
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
  private isEyePattern(
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
  private determineEyeColor(
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
          img.src = URL.createObjectURL(qrCode.settings.logoFile as File)
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
