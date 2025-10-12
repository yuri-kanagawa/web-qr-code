import { Language } from './valueObject'
import { LanguageValueError } from './error'

export class LanguageResult {
  constructor(
    public readonly language: Language | null,
    public readonly error: LanguageValueError | null
  ) {}

  get isSuccess(): boolean {
    return this.error === null
  }

  get isFailure(): boolean {
    return this.error !== null
  }
}
