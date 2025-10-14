import { DeviceValueError } from './error'
import { Device } from './valueObject'

export class DeviceResult {
  readonly device: Device | null
  readonly error: DeviceValueError | null

  constructor(device: Device | null, error: DeviceValueError | null) {
    this.device = device
    this.error = error
  }

  get isSuccess(): boolean {
    return this.device !== null && this.error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
