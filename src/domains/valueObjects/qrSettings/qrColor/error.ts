export class QrColorValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'QrColorValueError'
  }
}
