import { SubjectResult } from './result'
import { SubjectValueError } from './error'
import { Language } from '@/domains/valueObjects/language'

export class Subject {
  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): SubjectResult {
    // 長さチェック
    if (value.length > 200) {
      const errorMessage = language.isJapanese
        ? '件名が長すぎます（最大200文字）'
        : language.isFrench
        ? "L'objet est trop long (200 caractères maximum)"
        : 'Subject is too long (maximum 200 characters)'
      return new SubjectResult(null, new SubjectValueError(errorMessage))
    }

    return new SubjectResult(new Subject(value, language), null)
  }

  static empty(language: Language): Subject {
    return new Subject('', language)
  }

  static default(): Subject {
    return new Subject('', Language.default())
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

  equals(other: Subject): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
