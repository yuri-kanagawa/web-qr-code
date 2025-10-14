import { OsValueError } from './error'
import { Os } from './valueObject'

export class OsResult {
  readonly os: Os | null
  readonly error: OsValueError | null

  constructor(os: Os | null, error: OsValueError | null) {
    this.os = os
    this.error = error
  }

  get isSuccess(): boolean {
    return this.os !== null && this.error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
