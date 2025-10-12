import { Organization } from './valueObject'
import { OrganizationValueError } from './error'

export class OrganizationResult {
  private readonly _organization: Organization | null
  private readonly _error: OrganizationValueError | null

  constructor(organization: Organization | null, error: OrganizationValueError | null) {
    this._organization = organization
    this._error = error
  }

  get organization(): Organization | null {
    return this._organization
  }

  get error(): OrganizationValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._organization !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
