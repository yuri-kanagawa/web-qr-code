import { Language } from '@/domains/valueObjects/language'
import { PathBuilder } from '@/lib/routing'
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
      const errorMessage =
        language.locale.message.common.error.qrValueCannotBeEmpty
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

  get isDeviceRedirectUrl(): boolean {
    const pathBuilder = new PathBuilder(this._language)
    const redirectPath = pathBuilder.device.redirect
    return this._value.includes(redirectPath)
  }

  /**
   * WiFi情報をパース
   * フォーマット: WIFI:S:SSID;P:password;T:WPA;H:false;;
   */
  parseWifi(): { ssid?: string; password?: string; type?: number } {
    const wifiData = this._value.replace('WIFI:', '')
    const ssidMatch = wifiData.match(/S:([^;]+)/)
    const passwordMatch = wifiData.match(/P:([^;]+)/)
    const typeMatch = wifiData.match(/T:([^;]+)/)

    return {
      ssid: ssidMatch ? ssidMatch[1] : undefined,
      password: passwordMatch ? passwordMatch[1] : undefined,
      type: typeMatch ? this.parseWifiTypeValue(typeMatch[1]) : undefined
    }
  }

  /**
   * Email情報をパース
   * フォーマット: mailto:email@example.com?subject=Subject&body=Body
   */
  parseEmail(): { email?: string; subject?: string; body?: string } {
    const emailMatch = this._value.match(/mailto:([^?]+)/)
    const subjectMatch = this._value.match(/subject=([^&]+)/)
    const bodyMatch = this._value.match(/body=(.+)$/)

    return {
      email: emailMatch ? decodeURIComponent(emailMatch[1]) : undefined,
      subject: subjectMatch ? decodeURIComponent(subjectMatch[1]) : undefined,
      body: bodyMatch ? decodeURIComponent(bodyMatch[1]) : undefined
    }
  }

  /**
   * SMS情報をパース
   * フォーマット: sms:+1234567890?body=message
   */
  parseSms(): { phoneNumber?: string; body?: string } {
    const phoneMatch = this._value.match(/sms:([^?]+)/)
    const bodyMatch = this._value.match(/body=(.+)$/)

    return {
      phoneNumber: phoneMatch ? phoneMatch[1] : undefined,
      body: bodyMatch ? decodeURIComponent(bodyMatch[1]) : undefined
    }
  }

  /**
   * WiFiタイプ文字列を数値に変換
   */
  private parseWifiTypeValue(typeStr: string): number | undefined {
    const typeMap: Record<string, number> = {
      WPA: 1,
      WPA2: 1,
      WEP: 2,
      nopass: 3
    }
    return typeMap[typeStr.toUpperCase()]
  }
}
