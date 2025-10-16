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

  static get validTypes(): readonly string[] {
    return Object.values(WiFiType.ENCRYPTION_TYPES)
  }

  static isWPA(value: string): boolean {
    return value === WiFiType.ENCRYPTION_TYPES.WPA
  }

  static isWEP(value: string): boolean {
    return value === WiFiType.ENCRYPTION_TYPES.WEP
  }

  static isNoPassword(value: string): boolean {
    return value === WiFiType.ENCRYPTION_TYPES.NOPASS
  }

  static isEmpty(value: string): boolean {
    return value === WiFiType.ENCRYPTION_TYPES.EMPTY
  }

  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  private static validate(
    value: string,
    language: Language
  ): WiFiTypeValueError | null {
    if (!WiFiType.validTypes.includes(value)) {
      const locale = language.locale
      const errorMessage = locale.message.validation.common.invalid
      return new WiFiTypeValueError(errorMessage)
    }

    return null
  }

  static create(value: string, language: Language): WiFiTypeResult {
    const error = WiFiType.validate(value, language)
    if (error) {
      return new WiFiTypeResult(null, error)
    }

    return new WiFiTypeResult(new WiFiType(value, language), null)
  }

  static empty(language: Language): WiFiType {
    return new WiFiType(WiFiType.ENCRYPTION_TYPES.EMPTY, language)
  }

  static default(): WiFiType {
    return new WiFiType(WiFiType.ENCRYPTION_TYPES.WPA, Language.default())
  }

  static wpa(language: Language): WiFiType {
    return new WiFiType(WiFiType.ENCRYPTION_TYPES.WPA, language)
  }

  static wep(language: Language): WiFiType {
    return new WiFiType(WiFiType.ENCRYPTION_TYPES.WEP, language)
  }

  static nopass(language: Language): WiFiType {
    return new WiFiType(WiFiType.ENCRYPTION_TYPES.NOPASS, language)
  }

  get value(): string {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  get label(): string {
    const locale = this._language.locale
    const { word } = locale

    if (this.isWPA) {
      return word.options.wifiEncryption.wpa
    }
    if (this.isWEP) {
      return word.options.wifiEncryption.wep
    }
    if (this.isNoPassword) {
      return word.options.wifiEncryption.nopass
    }
    return word.options.wifiEncryption.empty
  }

  get isEmpty(): boolean {
    return this._value === WiFiType.ENCRYPTION_TYPES.EMPTY
  }

  get isWPA(): boolean {
    return this._value === WiFiType.ENCRYPTION_TYPES.WPA
  }

  get isWEP(): boolean {
    return this._value === WiFiType.ENCRYPTION_TYPES.WEP
  }

  get isNoPassword(): boolean {
    return this._value === WiFiType.ENCRYPTION_TYPES.NOPASS
  }

  equals(other: WiFiType): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
