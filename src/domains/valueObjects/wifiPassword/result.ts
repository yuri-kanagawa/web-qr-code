import { WiFiPassword } from './valueObject'
import { WiFiPasswordValueError } from './error'

export class WiFiPasswordResult {
  private readonly _wifiPassword: WiFiPassword | null
  private readonly _error: WiFiPasswordValueError | null

  constructor(wifiPassword: WiFiPassword | null, error: WiFiPasswordValueError | null) {
    this._wifiPassword = wifiPassword
    this._error = error
  }

  get wifiPassword(): WiFiPassword | null {
    return this._wifiPassword
  }

  get error(): WiFiPasswordValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._wifiPassword !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
