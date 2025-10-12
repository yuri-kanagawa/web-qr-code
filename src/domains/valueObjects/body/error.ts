export class BodyValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BodyValueError'
  }
}
