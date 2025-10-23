import { Language } from '@/domains/valueObjects/language'
import { QrValueError } from './error'
import { QrResult } from './result'

export class Qr {
  private readonly _value: string
  private readonly _language: Language

  private constructor(value: string, language: Language) {
    this._value = value
    this._language = language
  }

  static create(value: string, language: Language): QrResult {
    if (!value || value.trim() === '') {
      const errorMessage = language.isJapanese
        ? 'QR値を入力してください'
        : language.isFrench
          ? 'Veuillez saisir la valeur QR'
          : 'QR value cannot be empty'
      return new QrResult(null, new QrValueError(errorMessage))
    }
    return new QrResult(new Qr(value, language), null)
  }

  static empty(language: Language): Qr {
    return new Qr('', language)
  }

  static default(language: Language): Qr {
    return new Qr('', language)
  }

  get value(): string {
    return this._value
  }

  get language(): Language {
    return this._language
  }

  get isEmpty(): boolean {
    return this._value === ''
  }

  get isMap(): boolean {
    return (
      this._value.includes('maps.google.com') ||
      this._value.includes('google.com/maps') ||
      this._value.includes('maps.app.goo.gl')
    )
  }

  get isUrl(): boolean {
    const isHttpUrl =
      this._value.startsWith('https') || this._value.startsWith('http')
    return isHttpUrl && !this.isMap
  }

  get isSms(): boolean {
    return this._value.startsWith('sms')
  }

  get isTel(): boolean {
    return this._value.startsWith('tel')
  }

  get isEmail(): boolean {
    return this._value.startsWith('mailto')
  }

  get isVcard(): boolean {
    return this._value.startsWith('BEGIN:VCARD')
  }

  get isText(): boolean {
    return (
      !this.isSms &&
      !this.isTel &&
      !this.isEmail &&
      !this.isVcard &&
      !this.isMap
    )
  }
}
