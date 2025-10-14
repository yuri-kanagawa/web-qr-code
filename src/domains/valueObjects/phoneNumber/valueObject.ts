import { Language } from '@/domains/valueObjects/language'
import { PhoneNumberValueError } from './error'
import { PhoneNumberResult } from './result'

export class PhoneNumber {
  private static readonly INTERNATIONAL_PHONE_REGEX =
    /^\+(\d{1,3})\s\d{1,4}\s\d{3,4}\s\d{4}$/

  static isValidInternationalFormat(phoneNumber: string): boolean {
    return PhoneNumber.INTERNATIONAL_PHONE_REGEX.test(phoneNumber)
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

    // 数字、+、-、()、スペースのみ許可
    const phoneRegex = /^[0-9+\-() ]+$/
    if (!phoneRegex.test(value)) {
      const errorMessage = language.isJapanese
        ? '有効な電話番号を入力してください'
        : language.isFrench
          ? 'Veuillez saisir un numéro de téléphone valide'
          : 'Please enter a valid phone number'
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
