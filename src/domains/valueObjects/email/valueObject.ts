import { Language } from '@/domains/valueObjects/language'
import { EmailValueError } from './error'
import { EmailResult } from './result'

export class Email {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  private static readonly MAX_LENGTH = 254

  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static isValidFormat(value: string): boolean {
    if (!value) return false
    return Email.EMAIL_REGEX.test(value)
  }

  static create(value: string, language: Language): EmailResult {
    // 基本的なメールアドレスの形式チェック
    if (!Email.isValidFormat(value)) {
      const errorMessage =
        language.locale.message.validation.email.pleaseEnterValid
      return new EmailResult(null, new EmailValueError(errorMessage))
    }

    // 長さチェック
    if (value.length > Email.MAX_LENGTH) {
      const errorMessage = language.locale.message.validation.email.tooLong(
        Email.MAX_LENGTH
      )
      return new EmailResult(null, new EmailValueError(errorMessage))
    }

    return new EmailResult(new Email(value.trim(), language), null)
  }

  static empty(language: Language): Email {
    return new Email('', language)
  }

  static default(): Email {
    return new Email('', Language.default())
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

  equals(other: Email): boolean {
    return this._value.toLowerCase() === other._value.toLowerCase()
  }

  toString(): string {
    return this._value
  }

  // ドメイン部分を取得
  get domain(): string {
    const parts = this._value.split('@')
    return parts.length === 2 ? parts[1] : ''
  }

  // ローカル部分を取得
  get localPart(): string {
    const parts = this._value.split('@')
    return parts.length === 2 ? parts[0] : ''
  }
}
