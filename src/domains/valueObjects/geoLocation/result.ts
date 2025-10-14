import { GeoLocationError } from './error'
import { GeoLocation } from './valueObject'

export class GeoLocationResult {
  readonly geoLocation: GeoLocation | null
  readonly error: GeoLocationError | null

  constructor(geoLocation: GeoLocation | null, error: GeoLocationError | null) {
    this.geoLocation = geoLocation
    this.error = error
  }

  get isSuccess(): boolean {
    return this.geoLocation !== null && this.error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}

