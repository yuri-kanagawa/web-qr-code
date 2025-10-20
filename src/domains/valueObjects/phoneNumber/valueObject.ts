import { Language } from '@/domains/valueObjects/language'
import { PhoneNumberValueError } from './error'
import { PhoneNumberResult } from './result'

export class PhoneNumber {
  // より厳密な電話番号の正規表現
  private static readonly PHONE_REGEX =
    /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$|^(\+?[1-9]\d{1,14})$|^(\+?81[-.\s]?)?\(?([0-9]{2,4})\)?[-.\s]?([0-9]{2,4})[-.\s]?([0-9]{4})$/

  static isValidFormat(phoneNumber: string): boolean {
    return PhoneNumber.PHONE_REGEX.test(phoneNumber)
  }

  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): PhoneNumberResult {
    // 空文字の場合はそのまま許可
    if (value.trim().length === 0) {
      return new PhoneNumberResult(new PhoneNumber('', language), null)
    }

    // 基本的な文字チェック（数字、+、-、()、スペース、ドットのみ許可）
    const basicPhoneRegex = /^[0-9+\-().\s]+$/
    if (!basicPhoneRegex.test(value)) {
      const errorMessage = language.isJapanese
        ? '電話番号には数字、+、-、()、スペース、ドットのみ使用できます'
        : language.isFrench
          ? 'Le numéro de téléphone ne peut contenir que des chiffres, +, -, (), espaces et points'
          : 'Phone number can only contain digits, +, -, (), spaces, and dots'
      return new PhoneNumberResult(
        null,
        new PhoneNumberValueError(errorMessage)
      )
    }

    // より厳密な電話番号フォーマットチェック
    if (!PhoneNumber.isValidFormat(value)) {
      const errorMessage = language.isJapanese
        ? '有効な電話番号の形式で入力してください（例: +1-555-123-4567, 03-1234-5678）'
        : language.isFrench
          ? 'Veuillez saisir un numéro de téléphone dans un format valide (ex: +1-555-123-4567, 03-1234-5678)'
          : 'Please enter a valid phone number format (e.g., +1-555-123-4567, 03-1234-5678)'
      return new PhoneNumberResult(
        null,
        new PhoneNumberValueError(errorMessage)
      )
    }

    return new PhoneNumberResult(new PhoneNumber(value.trim(), language), null)
  }

  static empty(language: Language): PhoneNumber {
    return new PhoneNumber('', language)
  }

  static default(): PhoneNumber {
    return new PhoneNumber('', Language.default())
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

  equals(other: PhoneNumber): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
