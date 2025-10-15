/**
 * QRコードの目（Eye）の設定（複合ValueObject）
 */
export class EyeSettings {
  private constructor(
    private readonly _radius1: number,
    private readonly _radius2: number,
    private readonly _radius3: number
  ) {}

  static create(
    radius1: number = 0,
    radius2: number = 0,
    radius3: number = 0
  ): EyeSettings {
    return new EyeSettings(radius1, radius2, radius3)
  }

  static default(): EyeSettings {
    return new EyeSettings(0, 0, 0)
  }

  get radius1(): number {
    return this._radius1
  }

  get radius2(): number {
    return this._radius2
  }

  get radius3(): number {
    return this._radius3
  }

  changeRadius1(newRadius: number): EyeSettings {
    return new EyeSettings(newRadius, this._radius2, this._radius3)
  }

  changeRadius2(newRadius: number): EyeSettings {
    return new EyeSettings(this._radius1, newRadius, this._radius3)
  }

  changeRadius3(newRadius: number): EyeSettings {
    return new EyeSettings(this._radius1, this._radius2, newRadius)
  }
}
