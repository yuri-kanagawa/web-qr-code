export class QrCodeType {
  // 固定の定数として定義
  static readonly URL = 0
  static readonly EMAIL = 1
  static readonly TEXT = 2
  static readonly SMS = 3
  static readonly WIFI = 4
  static readonly CONTACT = 5
  static readonly DEVICE = 6
  static readonly MAP = 7
  static readonly PHONE = 8
  private constructor(private readonly _value: number) {}

  static create(): QrCodeType {
    return new QrCodeType(QrCodeType.URL)
  }

  static default(): QrCodeType {
    return new QrCodeType(QrCodeType.URL)
  }

  // QRコードタイプを変更する専用メソッド
  changeToUrl(): QrCodeType {
    return new QrCodeType(QrCodeType.URL)
  }

  changeToEmail(): QrCodeType {
    return new QrCodeType(QrCodeType.EMAIL)
  }

  changeToText(): QrCodeType {
    return new QrCodeType(QrCodeType.TEXT)
  }

  changeToSms(): QrCodeType {
    return new QrCodeType(QrCodeType.SMS)
  }

  changeToWifi(): QrCodeType {
    return new QrCodeType(QrCodeType.WIFI)
  }

  changeToContact(): QrCodeType {
    return new QrCodeType(QrCodeType.CONTACT)
  }

  changeToDevice(): QrCodeType {
    return new QrCodeType(QrCodeType.DEVICE)
  }

  changeToMap(): QrCodeType {
    return new QrCodeType(QrCodeType.MAP)
  }

  changeToPhone(): QrCodeType {
    return new QrCodeType(QrCodeType.PHONE)
  }

  get value(): number {
    return this._value
  }

  get isPhone(): boolean {
    return this._value === QrCodeType.PHONE
  }

  get name(): string {
    switch (this._value) {
      case QrCodeType.URL:
        return 'URL'
      case QrCodeType.EMAIL:
        return 'Email'
      case QrCodeType.TEXT:
        return 'Text'
      case QrCodeType.SMS:
        return 'SMS'
      case QrCodeType.WIFI:
        return 'WiFi'
      case QrCodeType.CONTACT:
        return 'Contact'
      case QrCodeType.DEVICE:
        return 'Device'
      case QrCodeType.MAP:
        return 'Map'
      case QrCodeType.PHONE:
        return 'Phone'
      default:
        return 'Unknown'
    }
  }

  equals(other: QrCodeType): boolean {
    return this._value === other._value
  }
}
