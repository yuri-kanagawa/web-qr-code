import { Result } from '@/domains/common'
import { QrStyleValueError } from './error'
import { QrStyle } from './valueObject'

export class QrStyleResult extends Result<QrStyle, QrStyleValueError> {
  private constructor(value: QrStyle | null, error: QrStyleValueError | null) {
    super(value, error)
  }

  get qrStyle(): QrStyle | null {
    return this.value
  }

  static ok(value: QrStyle): QrStyleResult {
    return new QrStyleResult(value, null)
  }

  static fail(error: QrStyleValueError): QrStyleResult {
    return new QrStyleResult(null, error)
  }
}
