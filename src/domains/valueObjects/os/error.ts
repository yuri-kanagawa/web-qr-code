export class OsValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OsValueError'
  }
}
