import { Language } from '@/domains/valueObjects/language'
import { Base64Error } from './error'
import { Base64Result } from './result'

export class Base64 {
  private static readonly BASE64_REGEX =
    /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,([A-Za-z0-9+/=]+)$/

  private readonly _value: string
  private readonly _mimeType: string
  private readonly _language: Language

  private constructor(value: string, mimeType: string, language: Language) {
    this._value = value
    this._mimeType = mimeType
    this._language = language
  }

  /**
   * Base64文字列から作成
   * @param value - Base64形式の文字列 (data:image/png;base64,...)
   * @param language - 言語設定
   */
  static create(value: string, language: Language): Base64Result {
    if (!value) {
      const errorMessage = language.isJapanese
        ? 'Base64文字列が空です'
        : language.isFrench
          ? 'La chaîne Base64 est vide'
          : 'Base64 string is empty'
      return new Base64Result(null, new Base64Error(errorMessage))
    }

    const match = value.match(Base64.BASE64_REGEX)
    if (!match) {
      const errorMessage = language.isJapanese
        ? '無効なBase64形式です'
        : language.isFrench
          ? 'Format Base64 invalide'
          : 'Invalid Base64 format'
      return new Base64Result(null, new Base64Error(errorMessage))
    }

    const mimeType = match[1]
    return new Base64Result(new Base64(value, mimeType, language), null)
  }

  /**
   * Fileオブジェクトから非同期でBase64を作成
   * @param file - 変換するファイル
   * @param language - 言語設定
   */
  static async fromFile(file: File, language: Language): Promise<Base64Result> {
    try {
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => {
          const result = reader.result?.toString() || ''
          resolve(result)
        }

        reader.onerror = (error) => {
          reject(error)
        }

        reader.readAsDataURL(file)
      })

      return Base64.create(base64String, language)
    } catch (error) {
      const errorMessage = language.isJapanese
        ? 'ファイルの読み込みに失敗しました'
        : language.isFrench
          ? 'Échec de la lecture du fichier'
          : 'Failed to read file'
      return new Base64Result(null, new Base64Error(errorMessage))
    }
  }

  /**
   * Base64文字列をFileオブジェクトに変換
   * @param fileName - ファイル名
   */
  toFile(fileName: string): File {
    // Base64のプレフィックス（data:image/png;base64, など）を取り除く
    const arr = this._value.split(',')
    const bstr = atob(arr[1]) // Base64をデコード
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    // バイナリデータをUint8Arrayに変換
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    // Fileオブジェクトを作成
    return new File([u8arr], fileName, { type: this._mimeType })
  }

  static default(): Base64 {
    return new Base64('', '', Language.default())
  }

  get value(): string {
    return this._value
  }

  get mimeType(): string {
    return this._mimeType
  }

  get language(): Language {
    return this._language
  }

  get isEmpty(): boolean {
    return this._value === ''
  }

  /**
   * 画像のMIMEタイプかどうか
   */
  get isImage(): boolean {
    return this._mimeType.startsWith('image/')
  }

  /**
   * Base64データ部分のみを取得
   */
  get dataOnly(): string {
    const arr = this._value.split(',')
    return arr[1] || ''
  }
}
