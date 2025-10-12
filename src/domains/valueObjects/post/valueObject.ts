import { PostResult } from './result'
import { PostValueError } from './error'
import { Language } from '@/domains/valueObjects/language'

export class Post {
  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): PostResult {
    // 長さチェック
    if (value.length > 100) {
      const errorMessage = language.isJapanese
        ? '役職名が長すぎます（最大100文字）'
        : language.isFrench
        ? 'Le titre du poste est trop long (100 caractères maximum)'
        : 'Job title is too long (maximum 100 characters)'
      return new PostResult(null, new PostValueError(errorMessage))
    }

    return new PostResult(new Post(value.trim(), language), null)
  }

  static empty(language: Language): Post {
    return new Post('', language)
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

  equals(other: Post): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
