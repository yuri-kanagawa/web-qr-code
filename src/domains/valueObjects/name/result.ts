import { Name } from './valueObject'
import { NameValueError } from './error'

export class NameResult {
  private readonly _name: Name | null
  private readonly _error: NameValueError | null

  constructor(name: Name | null, error: NameValueError | null) {
    this._name = name
    this._error = error
  }

  get name(): Name | null {
    return this._name
  }

  get error(): NameValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._name !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
