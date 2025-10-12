export class WiFiSsidValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WiFiSsidValueError'
  }
}
