export class AddressValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AddressValueError'
  }
}
