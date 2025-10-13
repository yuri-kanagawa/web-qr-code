import { QrValueError } from './error'
import { QrResult } from './result'


export class Qr {
  private readonly _value: string

  private constructor(value: string) {
    this._value = value
  }

  static create(value: string): QrResult {
    if (!value || value.trim() === '') {
      return new QrResult(null, new QrValueError('QR value cannot be empty'))
    }
    return new QrResult(new Qr(value), null)
  }

  static empty(): Qr {
    return new Qr('')
  }

  get value(): string {
    return this._value
  }

  get isEmpty(): boolean {
    return this._value === ''
  }

  get isMap(): boolean {
    return this._value.includes('maps.google.com') || 
           this._value.includes('google.com/maps') ||
           this._value.includes('maps.app.goo.gl')
  }

  get isUrl(): boolean {
    const isHttpUrl = this._value.startsWith('https') || this._value.startsWith('http')
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
    return !this.isSms && !this.isTel && !this.isEmail && !this.isVcard && !this.isMap
  }

}
