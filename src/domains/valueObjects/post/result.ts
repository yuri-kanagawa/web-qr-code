import { Post } from './valueObject'
import { PostValueError } from './error'

export class PostResult {
  private readonly _post: Post | null
  private readonly _error: PostValueError | null

  constructor(post: Post | null, error: PostValueError | null) {
    this._post = post
    this._error = error
  }

  get post(): Post | null {
    return this._post
  }

  get error(): PostValueError | null {
    return this._error
  }

  get isSuccess(): boolean {
    return this._post !== null && this._error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
