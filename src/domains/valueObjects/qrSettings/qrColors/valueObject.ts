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
}
