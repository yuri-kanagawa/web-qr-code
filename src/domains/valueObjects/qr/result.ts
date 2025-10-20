import { QrValueError } from './error'
import { Qr } from './valueObject'

export class QrResult {
  constructor(
    public readonly qr: Qr | null,
    public readonly error: QrValueError | null
  ) {}

  get isSuccess(): boolean {
    return this.error === null
  }

  get isFailure(): boolean {
    return this.error !== null
  }
}
