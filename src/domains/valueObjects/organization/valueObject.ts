import { OrganizationResult } from './result'
import { OrganizationValueError } from './error'
import { Language } from '@/domains/valueObjects/language'

export class Organization {
  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): OrganizationResult {
    // 長さチェック
    if (value.length > 200) {
      const errorMessage = language.isJapanese
        ? '組織名が長すぎます（最大200文字）'
        : language.isFrench
        ? "Le nom de l'organisation est trop long (200 caractères maximum)"
        : 'Organization name is too long (maximum 200 characters)'
      return new OrganizationResult(null, new OrganizationValueError(errorMessage))
    }

    return new OrganizationResult(new Organization(value.trim(), language), null)
  }

  static empty(language: Language): Organization {
    return new Organization('', language)
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

  equals(other: Organization): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
