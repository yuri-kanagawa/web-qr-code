import { Base64Error } from './error'
import { Base64 } from './valueObject'

export class Base64Result {
  readonly base64: Base64 | null
  readonly error: Base64Error | null

  constructor(base64: Base64 | null, error: Base64Error | null) {
    this.base64 = base64
    this.error = error
  }

  get isSuccess(): boolean {
    return this.base64 !== null && this.error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
