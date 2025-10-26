export class AlphanumericSymbolValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AlphanumericSymbolValueError'
  }
}
