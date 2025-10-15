/**
 * QRコードのロゴ設定（複合ValueObject）
 */
export class LogoSettings {
  private constructor(
    private readonly _image: string | undefined,
    private readonly _width: number | undefined,
    private readonly _height: number | undefined,
    private readonly _opacity: number | undefined,
    private readonly _removeQrCodeBehindLogo: boolean | undefined,
    private readonly _padding: number | undefined,
    private readonly _paddingStyle: 'square' | 'circle'
  ) {}

  static create(params: {
    image?: string
    width?: number
    height?: number
    opacity?: number
    removeQrCodeBehindLogo?: boolean
    padding?: number
    paddingStyle?: 'square' | 'circle'
  }): LogoSettings {
    return new LogoSettings(
      params.image,
      params.width,
      params.height,
      params.opacity,
      params.removeQrCodeBehindLogo,
      params.padding,
      params.paddingStyle || 'square'
    )
  }

  static default(): LogoSettings {
    return new LogoSettings(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      'square'
    )
  }

  get image(): string | undefined {
    return this._image
  }

  get width(): number | undefined {
    return this._width
  }

  get height(): number | undefined {
    return this._height
  }

  get opacity(): number | undefined {
    return this._opacity
  }

  get removeQrCodeBehindLogo(): boolean | undefined {
    return this._removeQrCodeBehindLogo
  }

  get padding(): number | undefined {
    return this._padding
  }

  get paddingStyle(): 'square' | 'circle' {
    return this._paddingStyle
  }

  get hasLogo(): boolean {
    return this._image !== undefined && this._image !== ''
  }

  changeImage(newImage: string): LogoSettings {
    return new LogoSettings(
      newImage,
      this._width,
      this._height,
      this._opacity,
      this._removeQrCodeBehindLogo,
      this._padding,
      this._paddingStyle
    )
  }

  changeSize(width: number, height: number): LogoSettings {
    return new LogoSettings(
      this._image,
      width,
      height,
      this._opacity,
      this._removeQrCodeBehindLogo,
      this._padding,
      this._paddingStyle
    )
  }
}

