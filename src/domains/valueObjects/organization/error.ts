export class OrganizationValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OrganizationValueError'
  }
}
