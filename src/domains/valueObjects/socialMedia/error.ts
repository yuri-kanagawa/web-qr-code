export class SocialMediaValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SocialMediaValueError'
  }
}

