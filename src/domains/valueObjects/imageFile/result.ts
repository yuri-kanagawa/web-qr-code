import { ImageFileError } from './error'
import { ImageFile } from './valueObject'

export class ImageFileResult {
  readonly imageFile: ImageFile | null
  readonly error: ImageFileError | null

  constructor(imageFile: ImageFile | null, error: ImageFileError | null) {
    this.imageFile = imageFile
    this.error = error
  }

  get isSuccess(): boolean {
    return this.imageFile !== null && this.error === null
  }

  get isFailure(): boolean {
    return !this.isSuccess
  }
}
