import { AddressResult } from './result'
import { AddressValueError } from './error'
import { Language } from '@/domains/valueObjects/language'

export class Address {
  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): AddressResult {
    // 長さチェック
    if (value.length > 500) {
      const errorMessage = language.isJapanese
        ? '住所が長すぎます（最大500文字）'
        : language.isFrench
        ? "L'adresse est trop longue (500 caractères maximum)"
        : 'Address is too long (maximum 500 characters)'
      return new AddressResult(null, new AddressValueError(errorMessage))
    }

    return new AddressResult(new Address(value.trim(), language), null)
  }

  static empty(language: Language): Address {
    return new Address('', language)
  }

  static default(): Address {
    return new Address('', Language.default())
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

  equals(other: Address): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
