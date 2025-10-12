export class QrValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'QrValueError'
  }
}