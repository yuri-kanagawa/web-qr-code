export class EyeRadiusValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EyeRadiusValueError'
  }
}
