import { WiFiSsid } from './valueObject'
import { WiFiSsidValueError } from './error'

export class WiFiSsidResult {
  private readonly _wifiSsid: WiFiSsid | null
  private readonly _error: WiFiSsidValueError | null

  constructor(wifiSsid: WiFiSsid | null, error: WiFiSsidValueError | null) {
    this._wifiSsid = wifiSsid
    this._error = error
  }

  get wifiSsid(): WiFiSsid | null {
    return this._wifiSsid
  }

  get error(): WiFiSsidValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._wifiSsid !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
