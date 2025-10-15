import { PhoneNumber } from './valueObject'
import { PhoneNumberValueError } from './error'

export class PhoneNumberResult {
  private readonly _phoneNumber: PhoneNumber | null
  private readonly _error: PhoneNumberValueError | null

  constructor(
    phoneNumber: PhoneNumber | null,
    error: PhoneNumberValueError | null
  ) {
    this._phoneNumber = phoneNumber
    this._error = error
  }

  get phoneNumber(): PhoneNumber | null {
    return this._phoneNumber
  }

  get error(): PhoneNumberValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._phoneNumber !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
