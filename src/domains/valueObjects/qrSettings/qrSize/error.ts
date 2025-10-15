export class QrSizeValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'QrSizeValueError'
  }
}

