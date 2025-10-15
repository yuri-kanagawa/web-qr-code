import { Result } from '@/domains/common'
import { QrColor } from './valueObject'
import { QrColorValueError } from './error'

export class QrColorResult extends Result<QrColor, QrColorValueError> {
  private constructor(value: QrColor | null, error: QrColorValueError | null) {
    super(value, error)
  }

  get qrColor(): QrColor | null {
    return this.value
  }

  static ok(value: QrColor): QrColorResult {
    return new QrColorResult(value, null)
  }

  static fail(error: QrColorValueError): QrColorResult {
    return new QrColorResult(null, error)
  }
}

