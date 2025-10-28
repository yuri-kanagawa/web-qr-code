import { Language } from '@/domains/valueObjects/language'
import { PhoneNumberValueError } from './error'
import { PhoneNumberResult } from './result'

export class PhoneNumber {
  static isValidFormat(phoneNumber: string): boolean {
    // 数字以外の文字を除去
    const digitsOnly = phoneNumber.replace(/[^\d]/g, '')

    // +で始まる場合（国際形式）
    if (phoneNumber.startsWith('+')) {
      // 最低でも7桁の数字が必要（+を含めると8文字以上）
      // 国コード（1-3桁）+ 番号（7桁以上）
      return digitsOnly.length >= 8 && digitsOnly.length <= 15
    }

    // 国内形式の場合
    // 最低でも7桁の数字が必要
    return digitsOnly.length >= 7 && digitsOnly.length <= 15
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
      const errorMessage =
        language.locale.message.validation.phone.invalidCharacters
      return new PhoneNumberResult(
        null,
        new PhoneNumberValueError(errorMessage)
      )
    }

    // より厳密な電話番号フォーマットチェック
    if (!PhoneNumber.isValidFormat(value)) {
      const errorMessage =
        language.locale.message.validation.phone.pleaseEnterValid
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
