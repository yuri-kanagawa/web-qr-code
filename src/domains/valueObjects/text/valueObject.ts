import { TextResult } from './result'
import { TextValueError } from './error'
import { Language } from '@/domains/valueObjects/language'

export class Text {
  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): TextResult {
    // 長さチェック（QRコードの最大容量を考慮）
    const maxLength = 4296 // QRコードの最大文字数（バージョン40、Lレベル）
    if (value.length > maxLength) {
      const errorMessage = language.isJapanese
        ? `テキストが長すぎます（最大${maxLength}文字）`
        : language.isFrench
        ? `Le texte est trop long (${maxLength} caractères maximum)`
        : `Text is too long (maximum ${maxLength} characters)`
      return new TextResult(null, new TextValueError(errorMessage))
    }

    return new TextResult(new Text(value, language), null)
  }

  static empty(language: Language): Text {
    return new Text('', language)
  }

  static default(): Text {
    return new Text('', Language.default())
  }

  get value(): string {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  get isEmpty(): boolean {
    return this._value.length === 0
  }

  get length(): number {
    return this._value.length
  }

  equals(other: Text): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
