import { WiFiTypeResult } from './result'
import { WiFiTypeValueError } from './error'
import { Language } from '@/domains/valueObjects/language'

export type WiFiEncryptionType = 'WPA' | 'WEP' | 'nopass' | ''

export class WiFiType {
  private readonly _value: WiFiEncryptionType
  private readonly _language: Language

  private constructor(value: WiFiEncryptionType, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): WiFiTypeResult {
    const validTypes: WiFiEncryptionType[] = ['WPA', 'WEP', 'nopass', '']

    if (!validTypes.includes(value as WiFiEncryptionType)) {
      const errorMessage = language.isJapanese
        ? '無効な暗号化タイプです'
        : language.isFrench
        ? 'Type de chiffrement invalide'
        : 'Invalid encryption type'
      return new WiFiTypeResult(null, new WiFiTypeValueError(errorMessage))
    }

    return new WiFiTypeResult(new WiFiType(value as WiFiEncryptionType, language), null)
  }

  static empty(language: Language): WiFiType {
    return new WiFiType('', language)
  }

  static wpa(language: Language): WiFiType {
    return new WiFiType('WPA', language)
  }

  static wep(language: Language): WiFiType {
    return new WiFiType('WEP', language)
  }

  static nopass(language: Language): WiFiType {
    return new WiFiType('nopass', language)
  }

  get value(): WiFiEncryptionType {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  get isEmpty(): boolean {
    return this._value === ''
  }

  get isWPA(): boolean {
    return this._value === 'WPA'
  }

  get isWEP(): boolean {
    return this._value === 'WEP'
  }

  get isNoPassword(): boolean {
    return this._value === 'nopass'
  }

  equals(other: WiFiType): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
