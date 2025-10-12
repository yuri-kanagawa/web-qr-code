import { Address } from './valueObject'
import { AddressValueError } from './error'

export class AddressResult {
  private readonly _address: Address | null
  private readonly _error: AddressValueError | null

  constructor(address: Address | null, error: AddressValueError | null) {
    this._address = address
    this._error = error
  }

  get address(): Address | null {
    return this._address
  }

  get error(): AddressValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._address !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
