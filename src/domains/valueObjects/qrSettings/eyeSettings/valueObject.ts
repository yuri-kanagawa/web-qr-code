import { EyeRadius } from '../eyeRadius'

/**
 * QRコードの目（Eye）の設定（複合ValueObject）
 */
export class EyeSettings {
  private constructor(
    private readonly _radius1: EyeRadius,
    private readonly _radius2: EyeRadius,
    private readonly _radius3: EyeRadius
  ) {}

  static create(
    radius1: EyeRadius = EyeRadius.default(),
    radius2: EyeRadius = EyeRadius.default(),
    radius3: EyeRadius = EyeRadius.default()
  ): EyeSettings {
    return new EyeSettings(radius1, radius2, radius3)
  }

  static default(): EyeSettings {
    return new EyeSettings(
      EyeRadius.default(),
      EyeRadius.default(),
      EyeRadius.default()
    )
  }

  get radius1(): number {
    return this._radius1.value
  }

  get radius2(): number {
    return this._radius2.value
  }

  get radius3(): number {
    return this._radius3.value
  }

  get radius1Object(): EyeRadius {
    return this._radius1
  }

  get radius2Object(): EyeRadius {
    return this._radius2
  }

  get radius3Object(): EyeRadius {
    return this._radius3
  }

  changeRadius1(newRadius: EyeRadius): EyeSettings {
    return new EyeSettings(newRadius, this._radius2, this._radius3)
  }

  changeRadius2(newRadius: EyeRadius): EyeSettings {
    return new EyeSettings(this._radius1, newRadius, this._radius3)
  }

  changeRadius3(newRadius: EyeRadius): EyeSettings {
    return new EyeSettings(this._radius1, this._radius2, newRadius)
  }
}
