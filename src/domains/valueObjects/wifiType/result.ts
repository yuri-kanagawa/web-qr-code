import { WiFiType } from './valueObject'
import { WiFiTypeValueError } from './error'

export class WiFiTypeResult {
  private readonly _wifiType: WiFiType | null
  private readonly _error: WiFiTypeValueError | null

  constructor(wifiType: WiFiType | null, error: WiFiTypeValueError | null) {
    this._wifiType = wifiType
    this._error = error
  }

  get wifiType(): WiFiType | null {
    return this._wifiType
  }

  get error(): WiFiTypeValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._wifiType !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
