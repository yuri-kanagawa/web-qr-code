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
 * QRコード設定のEntity（集約ルート）
 *
 * QRコードの全ての設定を保持し、整合性を保証する
 */
export class QrCode {
  private constructor(
    private _ecLevel: EcLevel,
    private _size: QrSize,
    private _colors: QrColors,
    private _logo: LogoSettings,
    private _eye: EyeSettings,
    private _qrStyle: QrStyle,
    private readonly _language: Language,
    private _enableCORS: boolean | undefined,
    private _quietZone: number | undefined
  ) {}

  /**
   * SearchParamsから QrCode を作成
   */
  static fromSearchParams(
    searchParams: URLSearchParams,
    language: Language = Language.default()
  ): QrCode {
    // EcLevel
    const ecLevelResult = EcLevel.create(
      searchParams.get('ecLevel') || 'M',
      language
    )
    const ecLevel = ecLevelResult.isSuccess
      ? ecLevelResult.ecLevel!
      : EcLevel.default()

    // Size
    const sizeValue = Number(searchParams.get('size')) || 150
    const sizeResult = QrSize.create(sizeValue, language)
    const size = sizeResult.isSuccess ? sizeResult.qrSize! : QrSize.default()

    // Colors
    const fgColorResult = QrColor.create(
      searchParams.get('fgColor') || '#000000',
      language
    )
    const bgColorResult = QrColor.create(
      searchParams.get('bgColor') || '#ffffff',
      language
    )
    const eyeColor1Result = QrColor.create(
      searchParams.get('eyeColor1') || searchParams.get('fgColor') || '#000000',
      language
    )
    const eyeColor2Result = QrColor.create(
      searchParams.get('eyeColor2') || searchParams.get('fgColor') || '#000000',
      language
    )
    const eyeColor3Result = QrColor.create(
      searchParams.get('eyeColor3') || searchParams.get('fgColor') || '#000000',
      language
    )

    const colors = QrColors.create(
      fgColorResult.isSuccess ? fgColorResult.qrColor! : QrColor.black(),
      bgColorResult.isSuccess ? bgColorResult.qrColor! : QrColor.white(),
      eyeColor1Result.isSuccess ? eyeColor1Result.qrColor! : undefined,
      eyeColor2Result.isSuccess ? eyeColor2Result.qrColor! : undefined,
      eyeColor3Result.isSuccess ? eyeColor3Result.qrColor! : undefined
    )

    // Logo
    const paddingStyle = searchParams.get('logoPaddingStyle')
    const logo = LogoSettings.create({
      image: searchParams.get('logoImage') || undefined,
      width: Number(searchParams.get('logoWidth')) || undefined,
      height: Number(searchParams.get('logoHeight')) || undefined,
      opacity: Number(searchParams.get('logoOpacity')) || undefined,
      removeQrCodeBehindLogo:
        searchParams.get('removeQrCodeBehindLogo') === 'true' || undefined,
      padding: Number(searchParams.get('logoPadding')) || undefined,
      paddingStyle:
        paddingStyle === 'circle' || paddingStyle === 'square'
          ? paddingStyle
          : 'square'
    })

    // Eye
    const eyeRadius1Result = EyeRadius.create(
      Number(searchParams.get('eyeRadius1')) || 0,
      language
    )
    const eyeRadius2Result = EyeRadius.create(
      Number(searchParams.get('eyeRadius2')) || 0,
      language
    )
    const eyeRadius3Result = EyeRadius.create(
      Number(searchParams.get('eyeRadius3')) || 0,
      language
    )

    const eye = EyeSettings.create(
      eyeRadius1Result.isSuccess
        ? eyeRadius1Result.eyeRadius!
        : EyeRadius.default(),
      eyeRadius2Result.isSuccess
        ? eyeRadius2Result.eyeRadius!
        : EyeRadius.default(),
      eyeRadius3Result.isSuccess
        ? eyeRadius3Result.eyeRadius!
        : EyeRadius.default()
    )

    // QrStyle
    const qrStyleResult = QrStyle.create(searchParams.get('qrStyle'), language)
    const qrStyle = qrStyleResult.isSuccess
      ? qrStyleResult.qrStyle!
      : QrStyle.default()

    // Other settings
    const enableCORS = searchParams.get('enableCORS')
      ? Boolean(searchParams.get('enableCORS'))
      : undefined
    const quietZone = Number(searchParams.get('quietZone')) || undefined

    return new QrCode(
      ecLevel,
      size,
      colors,
      logo,
      eye,
      qrStyle,
      language,
      enableCORS,
      quietZone
    )
  }

  /**
   * デフォルト設定を作成
   */
  static default(): QrCode {
    return new QrCode(
      EcLevel.default(),
      QrSize.default(),
      QrColors.default(),
      LogoSettings.default(),
      EyeSettings.default(),
      QrStyle.default(),
      Language.default(),
      undefined,
      undefined
    )
  }

  /**
   * SearchParamsに変換
   */
  toSearchParams(): Record<string, string> {
    const params: Record<string, string> = {
      ecLevel: this._ecLevel.value,
      size: this._size.value.toString(),
      fgColor: this._colors.fgColor.value,
      bgColor: this._colors.bgColor.value,
      eyeColor1: this._colors.eyeColor1.value,
      eyeColor2: this._colors.eyeColor2.value,
      eyeColor3: this._colors.eyeColor3.value,
      eyeRadius1: this._eye.radius1.toString(),
      eyeRadius2: this._eye.radius2.toString(),
      eyeRadius3: this._eye.radius3.toString()
    }

    if (this._logo.image) params.logoImage = this._logo.image
    if (this._logo.width) params.logoWidth = this._logo.width.toString()
    if (this._logo.height) params.logoHeight = this._logo.height.toString()
    if (this._logo.opacity) params.logoOpacity = this._logo.opacity.toString()
    if (this._logo.removeQrCodeBehindLogo)
      params.removeQrCodeBehindLogo = 'true'
    if (this._logo.padding) params.logoPadding = this._logo.padding.toString()
    params.logoPaddingStyle = this._logo.paddingStyle

    if (this._enableCORS !== undefined)
      params.enableCORS = this._enableCORS.toString()
    if (this._quietZone !== undefined)
      params.quietZone = this._quietZone.toString()
    if (this._qrStyle.value) params.qrStyle = this._qrStyle.value

    return params
  }

  // Getters
  get ecLevel(): EcLevel {
    return this._ecLevel
  }

  get size(): QrSize {
    return this._size
  }

  get colors(): QrColors {
    return this._colors
  }

  get logo(): LogoSettings {
    return this._logo
  }

  get eye(): EyeSettings {
    return this._eye
  }

  get language(): Language {
    return this._language
  }

  get enableCORS(): boolean | undefined {
    return this._enableCORS
  }

  get quietZone(): number | undefined {
    return this._quietZone
  }

  get qrStyle(): QrStyle {
    return this._qrStyle
  }

  // Setters（不変性を保つため新しいインスタンスを返す）
  changeEcLevel(newEcLevel: EcLevel): QrCode {
    return new QrCode(
      newEcLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone
    )
  }

  changeSize(newSize: QrSize): QrCode {
    return new QrCode(
      this._ecLevel,
      newSize,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone
    )
  }

  changeColors(newColors: QrColors): QrCode {
    return new QrCode(
      this._ecLevel,
      this._size,
      newColors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone
    )
  }

  changeLogo(newLogo: LogoSettings): QrCode {
    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      newLogo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone
    )
  }

  changeEye(newEye: EyeSettings): QrCode {
    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      newEye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone
    )
  }

  changeQrStyle(newQrStyle: QrStyle): QrCode {
    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      newQrStyle,
      this._language,
      this._enableCORS,
      this._quietZone
    )
  }
}
