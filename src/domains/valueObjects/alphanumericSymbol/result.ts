import { AlphanumericSymbolValueError } from './error'
import { AlphanumericSymbol } from './valueObject'
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
