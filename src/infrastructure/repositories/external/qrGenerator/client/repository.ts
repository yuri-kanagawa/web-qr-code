import { QrCode } from '@/domains/entities/qr'
import { IQrGeneratorRepository } from '@/domains/repositories/external/qrGenerator'
import { Language } from '@/domains/valueObjects/language'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { QRCode } from 'react-qrcode-logo'
import { CanvasTransparencyProcessor } from './processors/canvasTransparencyProcessor'
import { LogoProcessor } from './processors/logoProcessor'
import { SvgProcessor } from './processors/svgProcessor'

/**
 * QRコード生成リポジトリの実装（クライアントサイド）
 */
export class QrGeneratorRepository implements IQrGeneratorRepository {
  private readonly language: Language

  constructor(language: Language) {
    this.language = language
  }
  async generateCanvas(qrCode: QrCode): Promise<HTMLCanvasElement> {
    console.log('=== QrGeneratorRepository.generateCanvas 開始 ===')

    if (
      !qrCode.isValid() ||
      qrCode.qrValue.value === '' ||
      qrCode.qrValue.value.trim() === ''
    ) {
      throw new Error(
        this.language.locale.message.common.error.qrGenerator.invalidQrData
      )
    }

    // サイズチェック（75px未満は必ずエラー）
    if (qrCode.settings.size.value < 75) {
      throw new Error(
        this.language.locale.message.common.error.qrGenerator.sizeTooSmall(
          qrCode.settings.size.value
        )
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
        await LogoProcessor.addLogoToCanvas(canvas, qrCode, size)
      }

      return canvas
    } catch (error) {
      console.error('QRコード生成エラー:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      throw new Error(
        `${this.language.locale.message.common.error.qrGenerator.generationFailed}: ${errorMessage}`
      )
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
      // 透過色の場合は'transparent'に変換（react-qrcode-logo対応）
      const eyeColorArray = [
        qrCode.settings.colors.eyeColor1.isTransparent()
          ? 'transparent'
          : qrCode.settings.colors.eyeColor1.value,
        qrCode.settings.colors.eyeColor2.isTransparent()
          ? 'transparent'
          : qrCode.settings.colors.eyeColor2.value,
        qrCode.settings.colors.eyeColor3.isTransparent()
          ? 'transparent'
          : qrCode.settings.colors.eyeColor3.value
      ]

      console.log('=== QRCodeコンポーネントに渡すプロパティ ===')
      console.log({
        value: qrCode.qrValue.value,
        size: size,
        bgColor: qrCode.settings.colors.bgColor.isTransparent()
          ? 'transparent'
          : qrCode.settings.colors.bgColor.value,
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
        // bgColorが透過色の場合は'transparent'に設定（Canvas透過対応）
        const bgColor = qrCode.settings.colors.bgColor.isTransparent()
          ? 'transparent'
          : qrCode.settings.colors.bgColor.value

        // 透過背景の場合はSVG生成を強制する
        const qrProps: any = {
          value: qrCode.qrValue.value,
          size: size,
          bgColor: bgColor,
          fgColor: qrCode.settings.colors.fgColor.value,
          eyeColor: eyeColorArray as [string, string, string],
          eyeRadius: [
            qrCode.settings.eye.radius1,
            qrCode.settings.eye.radius2,
            qrCode.settings.eye.radius3
          ],
          ecLevel: qrCode.settings.ecLevel.value as 'L' | 'M' | 'Q' | 'H',
          quietZone: quietZone
        }

        // 透過背景の場合はSVGを強制生成（includeMarginをfalseにするとSVGになる場合がある）
        if (qrCode.settings.colors.bgColor.isTransparent()) {
          qrProps.includeMargin = false
          qrProps.enableCORS = false
          console.log('透過背景のためSVG生成を強制')
          console.log('QRCode props:', qrProps)
        }

        qrComponent = React.createElement(QRCode, qrProps)
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
        console.log('container HTML:', container.innerHTML)

        // Canvasが生成されているか確認
        const canvasElement = container.querySelector('canvas')
        if (canvasElement) {
          console.log('=== Canvas生成完了 ===')
          try {
            const ctx = canvas.getContext('2d')
            if (ctx) {
              // CanvasからCanvasへのコピー
              ctx.clearRect(0, 0, canvas.width, canvas.height)
              ctx.drawImage(canvasElement, 0, 0, canvas.width, canvas.height)

              // 透過処理（背景色のみ）
              CanvasTransparencyProcessor.processTransparency(canvas, qrCode)

              document.body.removeChild(container)
              root.unmount()
              resolve()
            } else {
              reject(
                new Error(
                  this.language.locale.message.common.error.qrGenerator.canvasContextFailed
                )
              )
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
            SvgProcessor.fixEyeColors(svgElement, qrCode.settings.colors)

            // 透過背景の処理
            if (qrCode.settings.colors.bgColor.isTransparent()) {
              console.log('透過背景処理を実行')
              SvgProcessor.fixTransparentBackground(svgElement)
            }

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
                // 透過背景の場合は全ピクセルを透過にクリア
                if (qrCode.settings.colors.bgColor.isTransparent()) {
                  // Canvas全体を完全にクリア（透過にする）
                  ctx.clearRect(0, 0, canvas.width, canvas.height)
                } else {
                  // 通常の背景色でクリア
                  ctx.fillStyle = qrCode.settings.colors.bgColor.value
                  ctx.fillRect(0, 0, canvas.width, canvas.height)
                }
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                document.body.removeChild(container)
                root.unmount()
                resolve()
              } else {
                reject(
                  new Error(
                    this.language.locale.message.common.error.qrGenerator.canvasContextFailed
                  )
                )
              }
            }
            img.onerror = (error) => {
              console.error('Image load error:', error)
              document.body.removeChild(container)
              root.unmount()
              reject(
                new Error(
                  this.language.locale.message.common.error.qrGenerator.svgLoadFailed
                )
              )
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
            reject(
              new Error(
                this.language.locale.message.common.error.qrGenerator.svgGenerationTimeout
              )
            )
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
}
