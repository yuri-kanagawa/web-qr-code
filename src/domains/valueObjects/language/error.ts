export class LanguageValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LanguageValueError'
  }
}
