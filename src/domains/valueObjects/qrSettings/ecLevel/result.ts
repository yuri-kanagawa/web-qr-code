import { Result } from '@/domains/common'
import { EcLevel } from './valueObject'
import { EcLevelValueError } from './error'

export class EcLevelResult extends Result<EcLevel, EcLevelValueError> {
  private constructor(value: EcLevel | null, error: EcLevelValueError | null) {
    super(value, error)
  }

  get ecLevel(): EcLevel | null {
    return this.value
  }

  static ok(value: EcLevel): EcLevelResult {
    return new EcLevelResult(value, null)
  }

  static fail(error: EcLevelValueError): EcLevelResult {
    return new EcLevelResult(null, error)
  }
}

