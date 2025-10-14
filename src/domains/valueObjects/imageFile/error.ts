export class ImageFileError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ImageFileError'
  }
}

