import { Result } from '@/domains/common'
import { QrSize } from './valueObject'
import { QrSizeValueError } from './error'

export class QrSizeResult extends Result<QrSize, QrSizeValueError> {
  private constructor(value: QrSize | null, error: QrSizeValueError | null) {
    super(value, error)
  }

  get qrSize(): QrSize | null {
    return this.value
  }

  static ok(value: QrSize): QrSizeResult {
    return new QrSizeResult(value, null)
  }

  static fail(error: QrSizeValueError): QrSizeResult {
    return new QrSizeResult(null, error)
  }
}
