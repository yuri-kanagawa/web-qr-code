import { WiFiPasswordResult } from './result'
import { WiFiPasswordValueError } from './error'
import { Language } from '@/domains/valueObjects/language'

export class WiFiPassword {
  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): WiFiPasswordResult {
    // 空文字の場合はそのまま許可（オープンネットワークの可能性）
    if (value.length === 0) {
      return new WiFiPasswordResult(new WiFiPassword('', language), null)
    }

    // 長さチェック（WPA2は8～63文字）
    if (value.length < 8 || value.length > 63) {
      const errorMessage = language.isJapanese
        ? 'パスワードは8～63文字で入力してください'
        : language.isFrench
        ? 'Le mot de passe doit contenir entre 8 et 63 caractères'
        : 'Password must be between 8 and 63 characters'
      return new WiFiPasswordResult(null, new WiFiPasswordValueError(errorMessage))
    }

    return new WiFiPasswordResult(new WiFiPassword(value, language), null)
  }

  static empty(language: Language): WiFiPassword {
    return new WiFiPassword('', language)
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

  equals(other: WiFiPassword): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
