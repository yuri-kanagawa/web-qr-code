export class WiFiTypeValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WiFiTypeValueError'
  }
}
