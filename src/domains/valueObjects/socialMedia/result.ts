import { SocialMediaValueError } from './error'
import { SocialMedia } from './valueObject'

export class SocialMediaResult {
  readonly socialMedia: SocialMedia | null
  readonly error: SocialMediaValueError | null

  constructor(
    socialMedia: SocialMedia | null,
    error: SocialMediaValueError | null
  ) {
    this.socialMedia = socialMedia
    this.error = error
  }

  get isSuccess(): boolean {
    return this.socialMedia !== null && this.error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
