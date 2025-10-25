import { Language } from '../language'

export class LatitudeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LatitudeError'
  }
}

export class LatitudeResult {
  readonly latitude: Latitude | null
  readonly error: LatitudeError | null

  constructor(latitude: Latitude | null, error: LatitudeError | null) {
    this.latitude = latitude
    this.error = error
  }

  static ok(latitude: Latitude): LatitudeResult {
    return new LatitudeResult(latitude, null)
  }

  static fail(error: LatitudeError): LatitudeResult {
    return new LatitudeResult(null, error)
  }

  get isSuccess(): boolean {
    return this.latitude !== null && this.error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}

/**
 * 緯度ValueObject
 */
export class Latitude {
  private static readonly MIN = -90
  private static readonly MAX = 90

  private readonly _value: number
  private readonly _language: Language

  private constructor(value: number, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: number, language: Language): LatitudeResult {
    if (value < Latitude.MIN || value > Latitude.MAX) {
      const errorMessage =
        language.locale.message.validation.map.latitude.pleaseEnterValid(
          Latitude.MIN,
          Latitude.MAX
        )
      return LatitudeResult.fail(new LatitudeError(errorMessage))
    }

    return LatitudeResult.ok(new Latitude(value, language))
  }

  static default(language: Language = Language.default()): Latitude {
    return new Latitude(35.681236, language) // 東京
  }

  get value(): number {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  equals(other: Latitude): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value.toString()
  }
}
