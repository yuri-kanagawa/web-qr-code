export class WiFiPasswordValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WiFiPasswordValueError'
  }
}
