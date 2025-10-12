import { Subject } from './valueObject'
import { SubjectValueError } from './error'

export class SubjectResult {
  private readonly _subject: Subject | null
  private readonly _error: SubjectValueError | null

  constructor(subject: Subject | null, error: SubjectValueError | null) {
    this._subject = subject
    this._error = error
  }

  get subject(): Subject | null {
    return this._subject
  }

  get error(): SubjectValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._subject !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
