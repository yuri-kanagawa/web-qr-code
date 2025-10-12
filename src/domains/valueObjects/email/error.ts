export class EmailValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmailValueError'
  }
}
