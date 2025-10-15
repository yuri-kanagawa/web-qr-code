import { CountryValueError } from './error'
import { Country } from './valueObject'

export class CountryResult {
  readonly country: Country | null
  readonly error: CountryValueError | null

  constructor(country: Country | null, error: CountryValueError | null) {
    this.country = country
    this.error = error
  }

  get isSuccess(): boolean {
    return this.country !== null && this.error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
