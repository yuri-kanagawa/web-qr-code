import { Language } from '../language'

export class LongitudeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LongitudeError'
  }
}

export class LongitudeResult {
  readonly longitude: Longitude | null
  readonly error: LongitudeError | null

  constructor(longitude: Longitude | null, error: LongitudeError | null) {
    this.longitude = longitude
    this.error = error
  }

  static ok(longitude: Longitude): LongitudeResult {
    return new LongitudeResult(longitude, null)
  }

  static fail(error: LongitudeError): LongitudeResult {
    return new LongitudeResult(null, error)
  }

  get isSuccess(): boolean {
    return this.longitude !== null && this.error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}

/**
 * 経度ValueObject
 */
export class Longitude {
  private static readonly MIN = -180
  private static readonly MAX = 180

  private readonly _value: number
  private readonly _language: Language

  private constructor(value: number, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: number, language: Language): LongitudeResult {
    if (value < Longitude.MIN || value > Longitude.MAX) {
      const errorMessage =
        language.locale.message.validation.map.longitude.pleaseEnterValid(
          Longitude.MIN,
          Longitude.MAX
        )
      return LongitudeResult.fail(new LongitudeError(errorMessage))
    }

    return LongitudeResult.ok(new Longitude(value, language))
  }

  static default(language: Language = Language.default()): Longitude {
    return new Longitude(139.767125, language) // 東京
  }

  get value(): number {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  equals(other: Longitude): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value.toString()
  }
}
