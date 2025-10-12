import { Text } from './valueObject'
import { TextValueError } from './error'

export class TextResult {
  private readonly _text: Text | null
  private readonly _error: TextValueError | null

  constructor(text: Text | null, error: TextValueError | null) {
    this._text = text
    this._error = error
  }

  get text(): Text | null {
    return this._text
  }

  get error(): TextValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._text !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
