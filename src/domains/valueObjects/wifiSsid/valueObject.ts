import { Language } from '@/domains/valueObjects/language'
import { WiFiSsidValueError } from './error'
import { WiFiSsidResult } from './result'

export class WiFiSsid {
  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): WiFiSsidResult {
    // 空文字チェック
    if (value.trim().length === 0) {
      return new WiFiSsidResult(new WiFiSsid('', language), null)
    }

    // 長さチェック（SSIDは最大32文字）
    if (value.length > 32) {
      const errorMessage = language.isJapanese
        ? 'SSIDが長すぎます（最大32文字）'
        : language.isFrench
          ? 'Le SSID est trop long (32 caractères maximum)'
          : 'SSID is too long (maximum 32 characters)'
      return new WiFiSsidResult(null, new WiFiSsidValueError(errorMessage))
    }

    return new WiFiSsidResult(new WiFiSsid(value, language), null)
  }

  static empty(language: Language): WiFiSsid {
    return new WiFiSsid('', language)
  }

  static default(): WiFiSsid {
    return new WiFiSsid('', Language.default())
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

  equals(other: WiFiSsid): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
