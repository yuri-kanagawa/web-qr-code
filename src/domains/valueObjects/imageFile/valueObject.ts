import { Base64 } from '@/domains/valueObjects/base64'
import { Language } from '@/domains/valueObjects/language'
import { ImageFileError } from './error'
import { ImageFileResult } from './result'

export class ImageFile {
  private static readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ] as const

  // デフォルトのファイルサイズ制限: 5MB
  private static readonly DEFAULT_MAX_SIZE = 5 * 1024 * 1024

  private readonly _file: File
  private readonly _language: Language

  private constructor(file: File, language: Language) {
    this._file = file
    this._language = language
  }

  /**
   * Fileオブジェクトから作成
   * @param file - ファイルオブジェクト
   * @param language - 言語設定
   * @param maxSize - 最大ファイルサイズ（バイト）
   */
  static create(
    file: File,
    language: Language,
    maxSize: number = ImageFile.DEFAULT_MAX_SIZE
  ): ImageFileResult {
    // ファイルの存在チェック
    if (!file) {
      const errorMessage =
        language.locale.message.validation.imageFile.notSpecified
      return new ImageFileResult(null, new ImageFileError(errorMessage))
    }

    // MIMEタイプのチェック
    if (!ImageFile.ALLOWED_MIME_TYPES.includes(file.type as any)) {
      const errorMessage =
        language.locale.message.validation.imageFile.unsupportedFormat(
          file.type
        )
      return new ImageFileResult(null, new ImageFileError(errorMessage))
    }

    // ファイルサイズのチェック
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1)
      const errorMessage =
        language.locale.message.validation.imageFile.tooLarge(maxSizeMB)
      return new ImageFileResult(null, new ImageFileError(errorMessage))
    }

    return new ImageFileResult(new ImageFile(file, language), null)
  }

  /**
   * Base64に変換
   */
  async toBase64(): Promise<Base64> {
    const result = await Base64.fromFile(this._file, this._language)
    if (result.isSuccess && result.base64) {
      return result.base64
    }
    return Base64.default()
  }

  static default(): ImageFile {
    // 空のFileオブジェクトを作成
    const emptyFile = new File([], '', { type: 'image/png' })
    return new ImageFile(emptyFile, Language.default())
  }

  get file(): File {
    return this._file
  }

  get name(): string {
    return this._file.name
  }

  get size(): number {
    return this._file.size
  }

  get type(): string {
    return this._file.type
  }

  get language(): Language {
    return this._language
  }

  /**
   * ファイルサイズをMB単位で取得
   */
  get sizeInMB(): number {
    return this._file.size / (1024 * 1024)
  }

  /**
   * ファイルが空かどうか
   */
  get isEmpty(): boolean {
    return this._file.size === 0
  }

  /**
   * 許可されている画像形式の一覧を取得
   */
  static get allowedMimeTypes(): readonly string[] {
    return ImageFile.ALLOWED_MIME_TYPES
  }
}
