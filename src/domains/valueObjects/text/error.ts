export class TextValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TextValueError'
  }
}
