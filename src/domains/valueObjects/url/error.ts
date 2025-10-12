export class UrlValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UrlValueError'
  }
}
