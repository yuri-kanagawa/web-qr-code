import { Url } from './valueObject'
import { UrlValueError } from './error'

export class UrlResult {
  private readonly _url: Url | null
  private readonly _error: UrlValueError | null

  constructor(url: Url | null, error: UrlValueError | null) {
    this._url = url
    this._error = error
  }

  get url(): Url | null {
    return this._url
  }

  get error(): UrlValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._url !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
