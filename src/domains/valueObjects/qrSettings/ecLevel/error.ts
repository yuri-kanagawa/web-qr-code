export class EcLevelValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EcLevelValueError'
  }
}

