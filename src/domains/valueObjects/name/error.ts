export class NameValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NameValueError'
  }
}
