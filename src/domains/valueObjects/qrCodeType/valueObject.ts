export class QrCodeType {
  // 固定の定数として定義
  static readonly URL = 0
  static readonly EMAIL = 10
  static readonly TEXT = 20
  static readonly SMS = 30
  static readonly WIFI = 40
  static readonly CONTACT = 50
  static readonly DEVICE = 60
  static readonly MAP = 70
  static readonly PHONE = 80
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

  get isUrl(): boolean {
    return this._value === QrCodeType.URL
  }

  get isEmail(): boolean {
    return this._value === QrCodeType.EMAIL
  }

  get isText(): boolean {
    return this._value === QrCodeType.TEXT
  }

  get isSms(): boolean {
    return this._value === QrCodeType.SMS
  }

  get isWifi(): boolean {
    return this._value === QrCodeType.WIFI
  }

  get isContact(): boolean {
    return this._value === QrCodeType.CONTACT
  }

  get isDevice(): boolean {
    return this._value === QrCodeType.DEVICE
  }

  get isMap(): boolean {
    return this._value === QrCodeType.MAP
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
