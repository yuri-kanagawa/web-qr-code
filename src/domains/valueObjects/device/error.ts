export class DeviceValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DeviceValueError'
  }
}
