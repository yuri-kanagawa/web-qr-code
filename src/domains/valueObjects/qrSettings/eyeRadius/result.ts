import { Result } from '@/domains/common'
import { EyeRadiusValueError } from './error'
import { EyeRadius } from './valueObject'

export class EyeRadiusResult extends Result<EyeRadius, EyeRadiusValueError> {
  private constructor(
    value: EyeRadius | null,
    error: EyeRadiusValueError | null
  ) {
    super(value, error)
  }

  get eyeRadius(): EyeRadius | null {
    return this.value
  }

  static ok(value: EyeRadius): EyeRadiusResult {
    return new EyeRadiusResult(value, null)
  }

  static fail(error: EyeRadiusValueError): EyeRadiusResult {
    return new EyeRadiusResult(null, error)
  }
}
