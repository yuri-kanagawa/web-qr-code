import { Email } from './valueObject'
import { EmailValueError } from './error'

export class EmailResult {
  private readonly _email: Email | null
  private readonly _error: EmailValueError | null

  constructor(email: Email | null, error: EmailValueError | null) {
    this._email = email
    this._error = error
  }

  get email(): Email | null {
    return this._email
  }

  get error(): EmailValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._email !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
