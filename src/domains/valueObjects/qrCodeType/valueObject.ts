import { Language } from '@/domains/valueObjects/language'

export enum QrCodeTypeEnum {
  URL = 'url',
  EMAIL = 'email',
  TEXT = 'text',
  SMS = 'sms',
  WIFI = 'wifi',
  CONTACT = 'contact',
  DEVICE = 'device',
  MAP = 'map',
  PHONE = 'phone'
}

export class QrCodeType {
  private constructor(private readonly _value: QrCodeTypeEnum) {}

  static create(
    value: string,
    language: Language
  ): { isSuccess: boolean; qrCodeType?: QrCodeType; error?: string } {
    const normalizedValue = value.toLowerCase().trim()

    switch (normalizedValue) {
      case QrCodeTypeEnum.URL:
      case 'url':
        return {
          isSuccess: true,
          qrCodeType: new QrCodeType(QrCodeTypeEnum.URL)
        }
      case QrCodeTypeEnum.EMAIL:
      case 'email':
        return {
          isSuccess: true,
          qrCodeType: new QrCodeType(QrCodeTypeEnum.EMAIL)
        }
      case QrCodeTypeEnum.TEXT:
      case 'text':
        return {
          isSuccess: true,
          qrCodeType: new QrCodeType(QrCodeTypeEnum.TEXT)
        }
      case QrCodeTypeEnum.SMS:
      case 'sms':
        return {
          isSuccess: true,
          qrCodeType: new QrCodeType(QrCodeTypeEnum.SMS)
        }
      case QrCodeTypeEnum.WIFI:
      case 'wifi':
      case 'wi-fi':
        return {
          isSuccess: true,
          qrCodeType: new QrCodeType(QrCodeTypeEnum.WIFI)
        }
      case QrCodeTypeEnum.CONTACT:
      case 'contact':
        return {
          isSuccess: true,
          qrCodeType: new QrCodeType(QrCodeTypeEnum.CONTACT)
        }
      case QrCodeTypeEnum.DEVICE:
      case 'device':
        return {
          isSuccess: true,
          qrCodeType: new QrCodeType(QrCodeTypeEnum.DEVICE)
        }
      case QrCodeTypeEnum.MAP:
      case 'map':
        return {
          isSuccess: true,
          qrCodeType: new QrCodeType(QrCodeTypeEnum.MAP)
        }
      case QrCodeTypeEnum.PHONE:
      case 'phone':
        return {
          isSuccess: true,
          qrCodeType: new QrCodeType(QrCodeTypeEnum.PHONE)
        }
      default:
        return {
          isSuccess: false,
          error: language.isEnglish
            ? `Invalid QR code type: ${value}`
            : `無効なQRコードタイプ: ${value}`
        }
    }
  }

  static default(): QrCodeType {
    return new QrCodeType(QrCodeTypeEnum.URL)
  }

  get value(): QrCodeTypeEnum {
    return this._value
  }

  get isPhone(): boolean {
    return this._value === QrCodeTypeEnum.PHONE
  }

  get name(): string {
    switch (this._value) {
      case QrCodeTypeEnum.URL:
        return 'URL'
      case QrCodeTypeEnum.EMAIL:
        return 'Email'
      case QrCodeTypeEnum.TEXT:
        return 'Text'
      case QrCodeTypeEnum.SMS:
        return 'SMS'
      case QrCodeTypeEnum.WIFI:
        return 'WiFi'
      case QrCodeTypeEnum.CONTACT:
        return 'Contact'
      case QrCodeTypeEnum.DEVICE:
        return 'Device'
      case QrCodeTypeEnum.MAP:
        return 'Map'
      case QrCodeTypeEnum.PHONE:
        return 'Phone'
      default:
        return 'Unknown'
    }
  }

  equals(other: QrCodeType): boolean {
    return this._value === other._value
  }
}
