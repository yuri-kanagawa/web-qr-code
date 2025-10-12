export class SubjectValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SubjectValueError'
  }
}
