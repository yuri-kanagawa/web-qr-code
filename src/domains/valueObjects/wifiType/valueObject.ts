import { Language } from '@/domains/valueObjects/language'
import { WiFiTypeValueError } from './error'
import { WiFiTypeResult } from './result'

export class WiFiType {
  static readonly ENCRYPTION_TYPES = {
    WPA: 'WPA',
    WEP: 'WEP',
    NOPASS: 'nopass',
    EMPTY: ''
  } as const

  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): WiFiTypeResult {
    const validTypes = ['WPA', 'WEP', 'nopass', ''] as const

    if (!validTypes.includes(value as any)) {
      const errorMessage = language.isJapanese
        ? '無効な暗号化タイプです'
        : language.isFrench
          ? 'Type de chiffrement invalide'
          : 'Invalid encryption type'
      return new WiFiTypeResult(null, new WiFiTypeValueError(errorMessage))
    }

    return new WiFiTypeResult(new WiFiType(value, language), null)
  }

  static empty(language: Language): WiFiType {
    return new WiFiType('', language)
  }

  static default(): WiFiType {
    return new WiFiType('WPA', Language.default())
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

  get value(): string {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  get label(): string {
    const locale = this._language.getLocale()
    const { word } = locale

    switch (this._value) {
      case 'WPA':
        return word.options.wifiEncryption.wpa
      case 'WEP':
        return word.options.wifiEncryption.wep
      case 'nopass':
        return word.options.wifiEncryption.nopass
      default:
        return word.options.wifiEncryption.empty
    }
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
