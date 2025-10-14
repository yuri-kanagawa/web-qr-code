export class CountryValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CountryValueError'
  }
}

