import { FileType } from '@/domains/valueObjects/fileType'
import { Language } from '@/domains/valueObjects/language'
import {
  EcLevel,
  EyeRadius,
  EyeSettings,
  LogoSettings,
  QrColor,
  QrColors,
  QrSize,
  QrStyle
} from '@/domains/valueObjects/qrSettings'

/**
 * QRコードの設定を管理するクラス（簡素化版）
 */
export class QrCodeSettings {
  private constructor(
    private _ecLevel: EcLevel,
    private _size: QrSize,
    private _colors: QrColors,
    private _logo: LogoSettings,
    private _eye: EyeSettings,
    private _qrStyle: QrStyle,
    private _enableCORS: boolean | undefined,
    private _quietZone: number | undefined,
    private _individualEyeSettings: boolean,
    private _fileType: FileType,
    private _logoFile: File | null,
    private readonly _language: Language
  ) {}

  // 推奨サイズの定数
  static readonly RECOMMENDED_SIZE = 75

  static default(language: Language = Language.default()): QrCodeSettings {
    return new QrCodeSettings(
      EcLevel.default(),
      QrSize.default(),
      QrColors.default(),
      LogoSettings.default(),
      EyeSettings.default(),
      QrStyle.default(),
      undefined,
      undefined,
      false,
      FileType.default(),
      null,
      language
    )
  }

  // 直接アクセス可能なプロパティ
  get ecLevel() {
    return this._ecLevel
  }
  get size() {
    return this._size
  }
  get colors() {
    return this._colors
  }
  get logo() {
    return this._logo
  }
  get eye() {
    return this._eye
  }
  get qrStyle() {
    return this._qrStyle
  }
  get enableCORS() {
    return this._enableCORS
  }
  get quietZone() {
    return this._quietZone
  }
  get individualEyeSettings() {
    return this._individualEyeSettings
  }
  get fileType() {
    return this._fileType
  }
  get logoFile() {
    return this._logoFile
  }

  get language() {
    return this._language
  }

  // 汎用的な更新メソッド
  update(
    updater: (settings: QrCodeSettings) => QrCodeSettings
  ): QrCodeSettings {
    return updater(this)
  }

  // よく使われる変更メソッドのみ
  changeEcLevel(ecLevel: string): QrCodeSettings {
    const result = EcLevel.create(ecLevel, this._language)
    if (!result.isSuccess || !result.ecLevel) return this
    return this.copy({ ecLevel: result.ecLevel })
  }

  changeSize(size: number): QrCodeSettings {
    const result = QrSize.create(size, this._language)
    if (!result.isSuccess || !result.qrSize) return this
    return this.copy({ size: result.qrSize })
  }

  changeColors(
    fgColor: string,
    bgColor: string,
    eyeColor1: string,
    eyeColor2: string,
    eyeColor3: string
  ): QrCodeSettings {
    const fgResult = QrColor.create(fgColor, this._language)
    const bgResult = QrColor.create(bgColor, this._language)
    const eye1Result = QrColor.create(eyeColor1, this._language)
    const eye2Result = QrColor.create(eyeColor2, this._language)
    const eye3Result = QrColor.create(eyeColor3, this._language)

    if (
      !fgResult.isSuccess ||
      !bgResult.isSuccess ||
      !eye1Result.isSuccess ||
      !eye2Result.isSuccess ||
      !eye3Result.isSuccess ||
      !fgResult.qrColor ||
      !bgResult.qrColor ||
      !eye1Result.qrColor ||
      !eye2Result.qrColor ||
      !eye3Result.qrColor
    ) {
      return this
    }

    const colors = QrColors.create(
      fgResult.qrColor,
      bgResult.qrColor,
      eye1Result.qrColor,
      eye2Result.qrColor,
      eye3Result.qrColor
    )

    return this.copy({ colors })
  }

  changeLogo(
    width: number,
    height: number,
    opacity: number,
    paddingStyle: 'square' | 'circle'
  ): QrCodeSettings {
    const logo = LogoSettings.create({
      width,
      height,
      opacity,
      paddingStyle
    })
    return this.copy({ logo })
  }

  changeEye(radius1: number, radius2: number, radius3: number): QrCodeSettings {
    const r1Result = EyeRadius.create(radius1, this._language)
    const r2Result = EyeRadius.create(radius2, this._language)
    const r3Result = EyeRadius.create(radius3, this._language)

    if (
      !r1Result.isSuccess ||
      !r2Result.isSuccess ||
      !r3Result.isSuccess ||
      !r1Result.eyeRadius ||
      !r2Result.eyeRadius ||
      !r3Result.eyeRadius
    ) {
      return this
    }

    const eye = EyeSettings.create(
      r1Result.eyeRadius,
      r2Result.eyeRadius,
      r3Result.eyeRadius
    )

    return this.copy({ eye })
  }

  changeQrStyle(qrStyle: number): QrCodeSettings {
    const result = QrStyle.create(qrStyle.toString(), this._language)
    if (!result.isSuccess || !result.qrStyle) return this
    return this.copy({ qrStyle: result.qrStyle })
  }

  changeToPng(): QrCodeSettings {
    return this.copy({ fileType: this._fileType.changeToPng() })
  }

  changeToJpeg(): QrCodeSettings {
    return this.copy({ fileType: this._fileType.changeToJpeg() })
  }

  changeToSvg(): QrCodeSettings {
    return this.copy({ fileType: this._fileType.changeToSvg() })
  }

  changeToWebp(): QrCodeSettings {
    return this.copy({ fileType: this._fileType.changeToWebp() })
  }

  changeLogoFile(logoFile: File | null): QrCodeSettings {
    return this.copy({ logoFile })
  }

  changeIndividualEyeSettings(individualEyeSettings: boolean): QrCodeSettings {
    let newEye = this._eye
    let newColors = this._colors

    if (!individualEyeSettings) {
      newColors = QrColors.create(
        this._colors.fgColor,
        this._colors.bgColor,
        this._colors.eyeColor1,
        this._colors.eyeColor1,
        this._colors.eyeColor1
      )

      const r1 = EyeRadius.create(this._eye.radius1, this._language)
      const r2 = EyeRadius.create(this._eye.radius1, this._language)
      const r3 = EyeRadius.create(this._eye.radius1, this._language)

      if (
        r1.isSuccess &&
        r2.isSuccess &&
        r3.isSuccess &&
        r1.eyeRadius &&
        r2.eyeRadius &&
        r3.eyeRadius
      ) {
        newEye = EyeSettings.create(r1.eyeRadius, r2.eyeRadius, r3.eyeRadius)
      }
    }

    return this.copy({
      colors: newColors,
      eye: newEye,
      individualEyeSettings
    })
  }

  // 目の色のコントラスト比チェック
  getLeftTopEyeContrastInfo() {
    return this._getEyeContrastInfo(this._colors.eyeColor1)
  }

  getRightTopEyeContrastInfo() {
    return this._getEyeContrastInfo(this._colors.eyeColor2)
  }

  getLeftBottomEyeContrastInfo() {
    return this._getEyeContrastInfo(this._colors.eyeColor3)
  }

  private _getEyeContrastInfo(eyeColor: any) {
    const eyeBgContrast = this._colors.getContrastRatio(
      eyeColor,
      this._colors.bgColor
    )
    const eyeFgContrast = this._colors.getContrastRatio(
      eyeColor,
      this._colors.fgColor
    )
    
    // 目の色が前景色と同じ場合は、前景色とのコントラスト警告を出さない
    const isEyeColorSameAsFgColor = eyeColor.equals(this._colors.fgColor)
    const hasLowContrast = eyeBgContrast < 3.0 || (!isEyeColorSameAsFgColor && eyeFgContrast < 3.0)

    const locale = this._language.locale
    const eyeBgContrastText = locale.word.warningMessages.eyeBgContrast(
      eyeBgContrast.toFixed(1)
    )
    const eyeFgContrastText = locale.word.warningMessages.eyeFgContrast(
      eyeFgContrast.toFixed(1)
    )

    const warningMessages = [
      ...(eyeBgContrast < 3.0 ? [eyeBgContrastText] : []),
      ...(!isEyeColorSameAsFgColor && eyeFgContrast < 3.0 ? [eyeFgContrastText] : [])
    ]

    return {
      eyeBgContrast,
      eyeFgContrast,
      hasLowContrast,
      eyeBgContrastText,
      eyeFgContrastText,
      warningMessages
    }
  }

  private copy(
    updates: Partial<{
      ecLevel: EcLevel
      size: QrSize
      colors: QrColors
      logo: LogoSettings
      eye: EyeSettings
      qrStyle: QrStyle
      enableCORS: boolean | undefined
      quietZone: number | undefined
      individualEyeSettings: boolean
      fileType: FileType
      logoFile: File | null
    }>
  ): QrCodeSettings {
    return new QrCodeSettings(
      updates.ecLevel ?? this._ecLevel,
      updates.size ?? this._size,
      updates.colors ?? this._colors,
      updates.logo ?? this._logo,
      updates.eye ?? this._eye,
      updates.qrStyle ?? this._qrStyle,
      updates.enableCORS ?? this._enableCORS,
      updates.quietZone ?? this._quietZone,
      updates.individualEyeSettings ?? this._individualEyeSettings,
      updates.fileType ?? this._fileType,
      'logoFile' in updates ? updates.logoFile : this._logoFile,
      this._language
    )
  }

  /**
   * 現在のサイズが推奨サイズ以下かどうかをチェック
   * QRコードの複雑さとロゴの有無を考慮した動的な閾値を使用
   */
  isSizeBelowRecommended(): boolean {
    // 基本の推奨サイズ
    let recommendedSize = QrCodeSettings.RECOMMENDED_SIZE

    // エラー訂正レベルが高い場合はより大きなサイズが必要
    if (this._ecLevel.value === 'H') {
      recommendedSize = Math.max(recommendedSize, 100)
    } else if (this._ecLevel.value === 'Q') {
      recommendedSize = Math.max(recommendedSize, 90)
    } else if (this._ecLevel.value === 'M') {
      recommendedSize = Math.max(recommendedSize, 80)
    }

    // ロゴがある場合はさらに大きなサイズが必要
    if (this._logoFile) {
      const logoAreaPercent =
        ((this._logo.width || 0) * (this._logo.height || 0)) / 10000
      if (logoAreaPercent > 0.05) {
        // ロゴが5%以上の面積を占める場合
        recommendedSize = Math.max(recommendedSize, 120)
      } else if (logoAreaPercent > 0.02) {
        // ロゴが2%以上の面積を占める場合
        recommendedSize = Math.max(recommendedSize, 100)
      }
    }

    const result = this._size.value < recommendedSize
    console.log('QrCodeSettings.isSizeBelowRecommended:', {
      currentSize: this._size.value,
      baseRecommendedSize: QrCodeSettings.RECOMMENDED_SIZE,
      calculatedRecommendedSize: recommendedSize,
      ecLevel: this._ecLevel.value,
      hasLogo: !!this._logoFile,
      logoAreaPercent: this._logoFile
        ? ((this._logo.width || 0) * (this._logo.height || 0)) / 10000
        : 0,
      result: result
    })
    return result
  }

  /**
   * 推奨サイズを取得（動的に計算）
   */
  get recommendedSize(): number {
    // 基本の推奨サイズ
    let recommendedSize = QrCodeSettings.RECOMMENDED_SIZE

    // エラー訂正レベルが高い場合はより大きなサイズが必要
    if (this._ecLevel.value === 'H') {
      recommendedSize = Math.max(recommendedSize, 100)
    } else if (this._ecLevel.value === 'Q') {
      recommendedSize = Math.max(recommendedSize, 90)
    } else if (this._ecLevel.value === 'M') {
      recommendedSize = Math.max(recommendedSize, 80)
    }

    // ロゴがある場合はさらに大きなサイズが必要
    if (this._logoFile) {
      const logoAreaPercent =
        ((this._logo.width || 0) * (this._logo.height || 0)) / 10000
      if (logoAreaPercent > 0.05) {
        // ロゴが5%以上の面積を占める場合
        recommendedSize = Math.max(recommendedSize, 120)
      } else if (logoAreaPercent > 0.02) {
        // ロゴが2%以上の面積を占める場合
        recommendedSize = Math.max(recommendedSize, 100)
      }
    }

    return recommendedSize
  }
}
