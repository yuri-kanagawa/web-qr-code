import { QrColor } from '../qrColor'

/**
 * QRコードの色設定（複合ValueObject）
 */
export class QrColors {
  private constructor(
    private readonly _fgColor: QrColor,
    private readonly _bgColor: QrColor,
    private readonly _eyeColor1: QrColor,
    private readonly _eyeColor2: QrColor,
    private readonly _eyeColor3: QrColor
  ) {}

  static create(
    fgColor: QrColor,
    bgColor: QrColor,
    eyeColor1?: QrColor,
    eyeColor2?: QrColor,
    eyeColor3?: QrColor
  ): QrColors {
    return new QrColors(
      fgColor,
      bgColor,
      eyeColor1 || fgColor,
      eyeColor2 || fgColor,
      eyeColor3 || fgColor
    )
  }

  static default(): QrColors {
    const fg = QrColor.black()
    const bg = QrColor.white()
    return new QrColors(fg, bg, fg, fg, fg)
  }

  get fgColor(): QrColor {
    return this._fgColor
  }

  get bgColor(): QrColor {
    return this._bgColor
  }

  get eyeColor1(): QrColor {
    return this._eyeColor1
  }

  get eyeColor2(): QrColor {
    return this._eyeColor2
  }

  get eyeColor3(): QrColor {
    return this._eyeColor3
  }

  changeFgColor(newColor: QrColor): QrColors {
    return new QrColors(
      newColor,
      this._bgColor,
      this._eyeColor1,
      this._eyeColor2,
      this._eyeColor3
    )
  }

  changeBgColor(newColor: QrColor): QrColors {
    return new QrColors(
      this._fgColor,
      newColor,
      this._eyeColor1,
      this._eyeColor2,
      this._eyeColor3
    )
  }

  changeEyeColor1(newColor: QrColor): QrColors {
    return new QrColors(
      this._fgColor,
      this._bgColor,
      newColor,
      this._eyeColor2,
      this._eyeColor3
    )
  }

  changeEyeColor2(newColor: QrColor): QrColors {
    return new QrColors(
      this._fgColor,
      this._bgColor,
      this._eyeColor1,
      newColor,
      this._eyeColor3
    )
  }

  changeEyeColor3(newColor: QrColor): QrColors {
    return new QrColors(
      this._fgColor,
      this._bgColor,
      this._eyeColor1,
      this._eyeColor2,
      newColor
    )
  }

  /**
   * 16進数カラーコードをRGB値に変換
   */
  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : { r: 0, g: 0, b: 0 }
  }

  /**
   * 相対輝度を計算（WCAG 2.1準拠）
   */
  private getRelativeLuminance(rgb: {
    r: number
    g: number
    b: number
  }): number {
    const { r, g, b } = rgb
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  /**
   * コントラスト比を計算
   */
  getContrastRatio(color1: QrColor, color2: QrColor): number {
    const rgb1 = this.hexToRgb(color1.value)
    const rgb2 = this.hexToRgb(color2.value)
    const lum1 = this.getRelativeLuminance(rgb1)
    const lum2 = this.getRelativeLuminance(rgb2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)
  }

  /**
   * 読み取りに失敗しやすいカラーコンビネーションかどうかを判定
   */
  hasPoorReadability(): boolean {
    // 前景色と背景色のコントラスト比が低い場合
    const fgBgContrast = this.getContrastRatio(this._fgColor, this._bgColor)
    if (fgBgContrast < 3.0) {
      return true
    }

    // 目の色と背景色のコントラスト比が低い場合
    const eye1BgContrast = this.getContrastRatio(this._eyeColor1, this._bgColor)
    const eye2BgContrast = this.getContrastRatio(this._eyeColor2, this._bgColor)
    const eye3BgContrast = this.getContrastRatio(this._eyeColor3, this._bgColor)

    if (eye1BgContrast < 3.0 || eye2BgContrast < 3.0 || eye3BgContrast < 3.0) {
      return true
    }

    // 目の色と前景色のコントラスト比が低い場合
    const eye1FgContrast = this.getContrastRatio(this._eyeColor1, this._fgColor)
    const eye2FgContrast = this.getContrastRatio(this._eyeColor2, this._fgColor)
    const eye3FgContrast = this.getContrastRatio(this._eyeColor3, this._fgColor)

    if (eye1FgContrast < 3.0 || eye2FgContrast < 3.0 || eye3FgContrast < 3.0) {
      return true
    }

    return false
  }

  /**
   * 読み取りに失敗しやすい理由を取得
   */
  getReadabilityIssues(language: Language): string[] {
    const issues: string[] = []

    // 前景色と背景色のコントラスト比チェック
    const fgBgContrast = this.getContrastRatio(this._fgColor, this._bgColor)
    if (fgBgContrast < 3.0) {
      issues.push(
        language.isJapanese
          ? `前景色と背景色のコントラスト比が低いです (${fgBgContrast.toFixed(1)}:1)`
          : `Low contrast between foreground and background colors (${fgBgContrast.toFixed(1)}:1)`
      )
    }

    // 目の色と背景色のコントラスト比チェック
    const eyeColors = [
      {
        color: this._eyeColor1,
        name: language.isJapanese ? '左上の目' : 'Top-left eye'
      },
      {
        color: this._eyeColor2,
        name: language.isJapanese ? '右上の目' : 'Top-right eye'
      },
      {
        color: this._eyeColor3,
        name: language.isJapanese ? '左下の目' : 'Bottom-left eye'
      }
    ]

    eyeColors.forEach(({ color, name }) => {
      const contrast = this.getContrastRatio(color, this._bgColor)
      if (contrast < 3.0) {
        issues.push(
          language.isJapanese
            ? `${name}と背景色のコントラスト比が低いです (${contrast.toFixed(1)}:1)`
            : `Low contrast between ${name} and background color (${contrast.toFixed(1)}:1)`
        )
      }
    })

    return issues
  }
}
