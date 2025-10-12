import { Body } from './valueObject'
import { BodyValueError } from './error'

export class BodyResult {
  private readonly _body: Body | null
  private readonly _error: BodyValueError | null

  constructor(body: Body | null, error: BodyValueError | null) {
    this._body = body
    this._error = error
  }

  get body(): Body | null {
    return this._body
  }

  get error(): BodyValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._body !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
