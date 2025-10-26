import { AlphanumericSymbolValueError } from './error'

export class AlphanumericSymbolResult {
  constructor(
    public readonly alphanumericSymbol: AlphanumericSymbol | null,
    public readonly error: AlphanumericSymbolValueError | null
  ) {}

  get isSuccess(): boolean {
    return this.error === null
  }

  get isFailure(): boolean {
    return this.error !== null
  }
}

export class AlphanumericSymbol {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value
  }

  equals(other: AlphanumericSymbol): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
