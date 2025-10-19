import { Address } from '@/domains/valueObjects/address'
import { Body } from '@/domains/valueObjects/body'
import { Device } from '@/domains/valueObjects/device'
import { Email } from '@/domains/valueObjects/email'
import { Language } from '@/domains/valueObjects/language'
import { Latitude } from '@/domains/valueObjects/latitude'
import { Longitude } from '@/domains/valueObjects/longitude'
import { Name } from '@/domains/valueObjects/name'
import { Organization } from '@/domains/valueObjects/organization'
import { Os } from '@/domains/valueObjects/os'
import { PhoneNumber } from '@/domains/valueObjects/phoneNumber'
import { Post } from '@/domains/valueObjects/post'
import { Qr as QrValue } from '@/domains/valueObjects/qr'
import { QrCodeType } from '@/domains/valueObjects/qrCodeType'
import {
  EcLevel,
  EyeRadius,
  EyeSettings,
  LogoSettings,
  QrColor,
  QrColors,
  QrSize,
  QrStyle
} from '@/domains/valueObjects/qrSettings'
import { Subject } from '@/domains/valueObjects/subject'
import { Text } from '@/domains/valueObjects/text'
import { Url } from '@/domains/valueObjects/url'
import { WiFiPassword } from '@/domains/valueObjects/wifiPassword'
import { WiFiSsid } from '@/domains/valueObjects/wifiSsid'
import { WiFiType } from '@/domains/valueObjects/wifiType'

/**
 * QRコードのEntity（集約ルート）
 *
 * QRコードの全ての設定と値を保持し、整合性を保証する
 */
export class QrCode {
  private constructor(
    // QRコード設定
    private _ecLevel: EcLevel,
    private _size: QrSize,
    private _colors: QrColors,
    private _logo: LogoSettings,
    private _eye: EyeSettings,
    private _qrStyle: QrStyle,
    private readonly _language: Language,
    private _enableCORS: boolean | undefined,
    private _quietZone: number | undefined,
    private _individualEyeSettings: boolean,
    private _qrCodeType: QrCodeType,
    // フォームの値
    private _url: Url | undefined,
    private _email: Email | undefined,
    private _subject: Subject | undefined,
    private _body: Body | undefined,
    private _text: Text | undefined,
    private _wifiSsid: WiFiSsid | undefined,
    private _wifiPassword: WiFiPassword | undefined,
    private _wifiType: WiFiType | undefined,
    private _phoneNumber: PhoneNumber | undefined,
    private _firstName: Name | undefined,
    private _lastName: Name | undefined,
    private _middleName: Name | undefined,
    private _emailContact: Email | undefined,
    private _mobilePhone: PhoneNumber | undefined,
    private _homePhone: PhoneNumber | undefined,
    private _homeAddress: Address | undefined,
    private _homeUrl: Url | undefined,
    private _organization: Organization | undefined,
    private _post: Post | undefined,
    private _workMobile: PhoneNumber | undefined,
    private _workPhone: PhoneNumber | undefined,
    private _workAddress: Address | undefined,
    private _workUrl: Url | undefined,
    private _device: Device | undefined,
    private _os: Os | undefined,
    private _latitude: Latitude | undefined,
    private _longitude: Longitude | undefined,
    private _qrValue: QrValue
  ) {}

  /**
   * デフォルトのQrを作成
   */
  static default(language: Language = Language.default()): QrCode {
    return new QrCode(
      EcLevel.default(),
      QrSize.default(),
      QrColors.default(),
      LogoSettings.default(),
      EyeSettings.default(),
      QrStyle.default(),
      language,
      undefined,
      undefined,
      false, // individualEyeSettings: デフォルトは統一設定
      QrCodeType.default(), // qrCodeType: デフォルトはURL
      undefined, // url
      undefined, // email
      undefined, // subject
      undefined, // body
      undefined, // text
      undefined, // wifiSsid
      undefined, // wifiPassword
      undefined, // wifiType
      undefined, // phoneNumber
      undefined, // firstName
      undefined, // lastName
      undefined, // middleName
      undefined, // emailContact
      undefined, // mobilePhone
      undefined, // homePhone
      undefined, // homeAddress
      undefined, // homeUrl
      undefined, // organization
      undefined, // post
      undefined, // workMobile
      undefined, // workPhone
      undefined, // workAddress
      undefined, // workUrl
      undefined, // device
      undefined, // os
      undefined, // latitude
      undefined, // longitude
      QrValue.default() // qrValue
    )
  }

  // Getters
  get ecLevel(): EcLevel {
    return this._ecLevel
  }

  get size(): QrSize {
    return this._size
  }

  get colors(): QrColors {
    return this._colors
  }

  get logo(): LogoSettings {
    return this._logo
  }

  get eye(): EyeSettings {
    return this._eye
  }

  get qrStyle(): QrStyle {
    return this._qrStyle
  }

  get language(): Language {
    return this._language
  }

  get enableCORS(): boolean | undefined {
    return this._enableCORS
  }

  get quietZone(): number | undefined {
    return this._quietZone
  }

  get individualEyeSettings(): boolean {
    return this._individualEyeSettings
  }

  get qrCodeType(): QrCodeType {
    return this._qrCodeType
  }

  // フォームの値のGetters
  get url(): Url | undefined {
    return this._url
  }

  get email(): Email | undefined {
    return this._email
  }

  get subject(): Subject | undefined {
    return this._subject
  }

  get body(): Body | undefined {
    return this._body
  }

  get text(): Text | undefined {
    return this._text
  }

  get wifiSsid(): WiFiSsid | undefined {
    return this._wifiSsid
  }

  get wifiPassword(): WiFiPassword | undefined {
    return this._wifiPassword
  }

  get wifiType(): WiFiType | undefined {
    return this._wifiType
  }

  get phoneNumber(): PhoneNumber | undefined {
    return this._phoneNumber
  }

  // QRコードの値を生成
  get qrValue(): QrValue {
    return this.generateQrValue()
  }

  private generateQrValue(): QrValue {
    switch (this._qrCodeType.value) {
      case 'url':
        return this._url
          ? QrValue.create(this._url.value, this._language).qr ||
              QrValue.default()
          : QrValue.default()
      case 'email':
        if (this._email) {
          const subject = this._subject
            ? `?subject=${encodeURIComponent(this._subject.value)}`
            : ''
          const body = this._body
            ? `&body=${encodeURIComponent(this._body.value)}`
            : ''
          return (
            QrValue.create(
              `mailto:${this._email.value}${subject}${body}`,
              this._language
            ).qr || QrValue.default()
          )
        }
        return QrValue.default()
      case 'text':
        return this._text
          ? QrValue.create(this._text.value, this._language).qr ||
              QrValue.default()
          : QrValue.default()
      case 'sms':
        if (this._phoneNumber) {
          const body = this._body
            ? `?body=${encodeURIComponent(this._body.value)}`
            : ''
          return (
            QrValue.create(
              `sms:${this._phoneNumber.value}${body}`,
              this._language
            ).qr || QrValue.default()
          )
        }
        return QrValue.default()
      case 'wifi':
        if (this._wifiSsid) {
          const password = this._wifiPassword
            ? `;P:${this._wifiPassword.value}`
            : ''
          const type = this._wifiType ? `;T:${this._wifiType.value}` : ''
          return (
            QrValue.create(
              `WIFI:S:${this._wifiSsid.value}${password}${type};H:false;;`,
              this._language
            ).qr || QrValue.default()
          )
        }
        return QrValue.default()
      case 'contact':
        // vCard形式の連絡先情報を生成
        if (this._firstName || this._lastName || this._emailContact) {
          let vcard = 'BEGIN:VCARD\nVERSION:3.0\n'
          if (this._firstName || this._lastName) {
            vcard += `FN:${this._firstName?.value || ''} ${this._lastName?.value || ''}\n`
            vcard += `N:${this._lastName?.value || ''};${this._firstName?.value || ''};;;\n`
          }
          if (this._emailContact) {
            vcard += `EMAIL:${this._emailContact.value}\n`
          }
          if (this._mobilePhone) {
            vcard += `TEL:${this._mobilePhone.value}\n`
          }
          if (this._homePhone) {
            vcard += `TEL;TYPE=HOME:${this._homePhone.value}\n`
          }
          if (this._workMobile) {
            vcard += `TEL;TYPE=WORK:${this._workMobile.value}\n`
          }
          if (this._workPhone) {
            vcard += `TEL;TYPE=WORK:${this._workPhone.value}\n`
          }
          if (this._homeAddress) {
            vcard += `ADR;TYPE=HOME:;;${this._homeAddress.value};;;;\n`
          }
          if (this._workAddress) {
            vcard += `ADR;TYPE=WORK:;;${this._workAddress.value};;;;\n`
          }
          if (this._homeUrl) {
            vcard += `URL:${this._homeUrl.value}\n`
          }
          if (this._workUrl) {
            vcard += `URL;TYPE=WORK:${this._workUrl.value}\n`
          }
          if (this._organization) {
            vcard += `ORG:${this._organization.value}\n`
          }
          if (this._post) {
            vcard += `TITLE:${this._post.value}\n`
          }
          vcard += 'END:VCARD'
          return QrValue.create(vcard, this._language).qr || QrValue.default()
        }
        return QrValue.default()
      case 'device':
        // デバイス情報のQRコード（カスタム形式）
        if (this._device && this._os) {
          const deviceInfo = `DEVICE:${this._device.value}:${this._os.value}`
          return (
            QrValue.create(deviceInfo, this._language).qr || QrValue.default()
          )
        }
        return QrValue.default()
      case 'map':
        // 地図情報のQRコード
        if (this._latitude && this._longitude) {
          return (
            QrValue.create(
              `geo:${this._latitude.value},${this._longitude.value}`,
              this._language
            ).qr || QrValue.default()
          )
        }
        return QrValue.default()
      case 'phone':
        // 電話番号のQRコード
        console.log(
          'generateQrValue phone case, _phoneNumber:',
          this._phoneNumber
        )
        if (this._phoneNumber) {
          const telValue = `tel:${this._phoneNumber.value}`
          console.log('generateQrValue phone telValue:', telValue)
          return (
            QrValue.create(telValue, this._language).qr || QrValue.default()
          )
        }
        console.log('generateQrValue phone case, _phoneNumber is undefined')
        return QrValue.default()
      default:
        return QrValue.default()
    }
  }

  // フォームの値のオブジェクト形式でのアクセス
  get value(): {
    // URL
    url?: string
    // Email
    email?: string
    subject?: string
    body?: string
    // Text
    text?: string
    // WiFi
    ssid?: string
    password?: string
    type?: string
    // SMS
    phoneNumber?: string
    smsBody?: string
    // Contact
    firstName?: string
    lastName?: string
    middleName?: string
    emailContact?: string
    mobilePhone?: string
    homePhone?: string
    homeAddress?: string
    homeUrl?: string
    organization?: string
    post?: string
    workMobile?: string
    workPhone?: string
    workAddress?: string
    workUrl?: string
    // Device
    device?: number
    os?: number
    // Map
    latitude?: number
    longitude?: number
  } {
    return {
      // URL
      url: this._url?.value,
      // Email
      email: this._email?.value,
      subject: this._subject?.value,
      body: this._body?.value,
      // Text
      text: this._text?.value,
      // WiFi
      ssid: this._wifiSsid?.value,
      password: this._wifiPassword?.value,
      type: this._wifiType?.value,
      // SMS
      phoneNumber: this._phoneNumber?.value,
      smsBody: this._body?.value,
      // Contact
      firstName: this._firstName?.value,
      lastName: this._lastName?.value,
      middleName: this._middleName?.value,
      emailContact: this._emailContact?.value,
      mobilePhone: this._mobilePhone?.value,
      homePhone: this._homePhone?.value,
      homeAddress: this._homeAddress?.value,
      homeUrl: this._homeUrl?.value,
      organization: this._organization?.value,
      post: this._post?.value,
      workMobile: this._workMobile?.value,
      workPhone: this._workPhone?.value,
      workAddress: this._workAddress?.value,
      workUrl: this._workUrl?.value,
      // Device
      device: this._device?.value,
      os: this._os?.value,
      // Map
      latitude: this._latitude?.value,
      longitude: this._longitude?.value
    }
  }

  // Change methods for QR settings
  changeEcLevel(ecLevel: string): QrCode {
    const result = EcLevel.create(ecLevel, this._language)
    if (!result.isSuccess || !result.ecLevel) {
      return this // エラーの場合は現在のオブジェクトを返す
    }
    return new QrCode(
      result.ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeSize(size: number): QrCode {
    const result = QrSize.create(size, this._language)
    if (!result.isSuccess || !result.qrSize) {
      return this // エラーの場合は現在のオブジェクトを返す
    }
    return new QrCode(
      this._ecLevel,
      result.qrSize,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeColors(
    fgColor: string,
    bgColor: string,
    eyeColor1: string,
    eyeColor2: string,
    eyeColor3: string
  ): QrCode {
    const fgResult = QrColor.create(fgColor, this._language)
    const bgResult = QrColor.create(bgColor, this._language)
    const eye1Result = QrColor.create(eyeColor1, this._language)
    const eye2Result = QrColor.create(eyeColor2, this._language)
    const eye3Result = QrColor.create(eyeColor3, this._language)

    if (
      !fgResult.isSuccess ||
      !bgResult.isSuccess ||
      !eye1Result.isSuccess ||
      !eye2Result.isSuccess ||
      !eye3Result.isSuccess ||
      !fgResult.qrColor ||
      !bgResult.qrColor ||
      !eye1Result.qrColor ||
      !eye2Result.qrColor ||
      !eye3Result.qrColor
    ) {
      return this // エラーの場合は現在のオブジェクトを返す
    }

    const colors = QrColors.create(
      fgResult.qrColor,
      bgResult.qrColor,
      eye1Result.qrColor,
      eye2Result.qrColor,
      eye3Result.qrColor
    )

    return new QrCode(
      this._ecLevel,
      this._size,
      colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeLogo(
    width: number,
    height: number,
    opacity: number,
    paddingStyle: 'square' | 'circle'
  ): QrCode {
    const logo = LogoSettings.create({
      width,
      height,
      opacity,
      paddingStyle
    })

    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeEye(radius1: number, radius2: number, radius3: number): QrCode {
    const r1Result = EyeRadius.create(radius1, this._language)
    const r2Result = EyeRadius.create(radius2, this._language)
    const r3Result = EyeRadius.create(radius3, this._language)

    if (
      !r1Result.isSuccess ||
      !r2Result.isSuccess ||
      !r3Result.isSuccess ||
      !r1Result.eyeRadius ||
      !r2Result.eyeRadius ||
      !r3Result.eyeRadius
    ) {
      return this // エラーの場合は現在のオブジェクトを返す
    }

    const eye = EyeSettings.create(
      r1Result.eyeRadius,
      r2Result.eyeRadius,
      r3Result.eyeRadius
    )

    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeQrStyle(qrStyle: number): QrCode {
    const result = QrStyle.create(qrStyle.toString(), this._language)
    if (!result.isSuccess || !result.qrStyle) {
      return this // エラーの場合は現在のオブジェクトを返す
    }
    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      result.qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeQrCodeType(qrCodeType: string): QrCode {
    const result = QrCodeType.create(qrCodeType, this._language)
    if (!result.isSuccess || !result.qrCodeType) {
      return this // エラーの場合は現在のオブジェクトを返す
    }

    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      result.qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeIndividualEyeSettings(individualEyeSettings: boolean): QrCode {
    let newEye = this._eye
    let newColors = this._colors

    // OFFにした時（統一設定に戻す時）、全ての目を左上の値に統一
    if (!individualEyeSettings) {
      // 目の色を統一
      newColors = QrColors.create(
        this._colors.fgColor,
        this._colors.bgColor,
        this._colors.eyeColor1,
        this._colors.eyeColor1, // eyeColor2を eyeColor1に統一
        this._colors.eyeColor1 // eyeColor3を eyeColor1に統一
      )

      // 目の半径も統一
      const r1 = EyeRadius.create(this._eye.radius1, this._language)
      const r2 = EyeRadius.create(this._eye.radius1, this._language)
      const r3 = EyeRadius.create(this._eye.radius1, this._language)

      if (
        r1.isSuccess &&
        r2.isSuccess &&
        r3.isSuccess &&
        r1.eyeRadius &&
        r2.eyeRadius &&
        r3.eyeRadius
      ) {
        newEye = EyeSettings.create(r1.eyeRadius, r2.eyeRadius, r3.eyeRadius)
      }
    }

    return new QrCode(
      this._ecLevel,
      this._size,
      newColors,
      this._logo,
      newEye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  // Change methods for form values
  changeUrl(url: string | undefined): QrCode {
    let urlValueObject: Url | undefined = undefined
    if (url !== undefined && url.trim() !== '') {
      const result = Url.create(url, this._language)
      if (result.isSuccess && result.url) {
        urlValueObject = result.url
      }
    }

    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      urlValueObject,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeEmail(email: string | undefined): QrCode {
    let emailValueObject: Email | undefined = undefined
    if (email !== undefined && email.trim() !== '') {
      const result = Email.create(email, this._language)
      if (result.isSuccess && result.email) {
        emailValueObject = result.email
      }
    }

    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      emailValueObject,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeSubject(subject: string | undefined): QrCode {
    let subjectValueObject: Subject | undefined = undefined
    if (subject !== undefined && subject.trim() !== '') {
      const result = Subject.create(subject, this._language)
      if (result.isSuccess && result.subject) {
        subjectValueObject = result.subject
      }
    }

    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      subjectValueObject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeBody(body: string | undefined): QrCode {
    let bodyValueObject: Body | undefined = undefined
    if (body !== undefined && body.trim() !== '') {
      const result = Body.create(body, this._language)
      if (result.isSuccess && result.body) {
        bodyValueObject = result.body
      }
    }

    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      bodyValueObject,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeText(text: string | undefined): QrCode {
    let textValueObject: Text | undefined = undefined
    if (text !== undefined && text.trim() !== '') {
      const result = Text.create(text, this._language)
      if (result.isSuccess && result.text) {
        textValueObject = result.text
      }
    }

    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      textValueObject,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeWifiSsid(wifiSsid: string | undefined): QrCode {
    let wifiSsidValueObject: WiFiSsid | undefined = undefined
    if (wifiSsid !== undefined && wifiSsid.trim() !== '') {
      const result = WiFiSsid.create(wifiSsid, this._language)
      if (result.isSuccess && result.wifiSsid) {
        wifiSsidValueObject = result.wifiSsid
      }
    }

    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      wifiSsidValueObject,
      this._wifiPassword,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeWifiPassword(wifiPassword: string | undefined): QrCode {
    let wifiPasswordValueObject: WiFiPassword | undefined = undefined
    if (wifiPassword !== undefined && wifiPassword.trim() !== '') {
      const result = WiFiPassword.create(wifiPassword, this._language)
      if (result.isSuccess && result.wifiPassword) {
        wifiPasswordValueObject = result.wifiPassword
      }
    }

    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      wifiPasswordValueObject,
      this._wifiType,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changeWifiType(wifiType: number | undefined): QrCode {
    let wifiTypeValueObject: WiFiType | undefined = undefined
    if (wifiType !== undefined) {
      const result = WiFiType.create(wifiType.toString(), this._language)
      if (result.isSuccess && result.wifiType) {
        wifiTypeValueObject = result.wifiType
      }
    }

    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      wifiTypeValueObject,
      this._phoneNumber,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
  }

  changePhoneNumber(phoneNumber: string | undefined): QrCode {
    let phoneNumberValueObject: PhoneNumber | undefined = undefined
    if (phoneNumber !== undefined && phoneNumber.trim() !== '') {
      console.log('changePhoneNumber input:', phoneNumber)
      const result = PhoneNumber.create(phoneNumber, this._language)
      console.log('PhoneNumber.create result:', result)
      if (result.isSuccess && result.phoneNumber) {
        phoneNumberValueObject = result.phoneNumber
        console.log('phoneNumberValueObject set:', phoneNumberValueObject.value)
      } else {
        console.log('PhoneNumber.create failed:', result.error)
      }
    }

    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
      this._individualEyeSettings,
      this._qrCodeType,
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      phoneNumberValueObject,
      this._firstName,
      this._lastName,
      this._middleName,
      this._emailContact,
      this._mobilePhone,
      this._homePhone,
      this._homeAddress,
      this._homeUrl,
      this._organization,
      this._post,
      this._workMobile,
      this._workPhone,
      this._workAddress,
      this._workUrl,
      this._device,
      this._os,
      this._latitude,
      this._longitude,
      this._qrValue
    )
    console.log(
      'changePhoneNumber returning new QrCode with phoneNumber:',
      phoneNumberValueObject?.value
    )
  }

  // 目の色のコントラスト比チェック（左上）
  getLeftTopEyeContrastInfo(): {
    eyeBgContrast: number
    eyeFgContrast: number
    hasLowContrast: boolean
    eyeBgContrastText: string
    eyeFgContrastText: string
    warningMessages: string[]
  } {
    return this._getEyeContrastInfo(this._colors.eyeColor1)
  }

  // 目の色のコントラスト比チェック（右上）
  getRightTopEyeContrastInfo(): {
    eyeBgContrast: number
    eyeFgContrast: number
    hasLowContrast: boolean
    eyeBgContrastText: string
    eyeFgContrastText: string
    warningMessages: string[]
  } {
    return this._getEyeContrastInfo(this._colors.eyeColor2)
  }

  // 目の色のコントラスト比チェック（左下）
  getLeftBottomEyeContrastInfo(): {
    eyeBgContrast: number
    eyeFgContrast: number
    hasLowContrast: boolean
    eyeBgContrastText: string
    eyeFgContrastText: string
    warningMessages: string[]
  } {
    return this._getEyeContrastInfo(this._colors.eyeColor3)
  }

  // 目の色のコントラスト比チェック（共通処理）
  private _getEyeContrastInfo(eyeColor: any): {
    eyeBgContrast: number
    eyeFgContrast: number
    hasLowContrast: boolean
    eyeBgContrastText: string
    eyeFgContrastText: string
    warningMessages: string[]
  } {
    const eyeBgContrast = this._colors.getContrastRatio(
      eyeColor,
      this._colors.bgColor
    )
    const eyeFgContrast = this._colors.getContrastRatio(
      eyeColor,
      this._colors.fgColor
    )
    const hasLowContrast = eyeBgContrast < 3.0 || eyeFgContrast < 3.0

    const eyeBgContrastText = this._language.isEnglish
      ? `Eye color has low contrast with background (${eyeBgContrast.toFixed(1)}:1)`
      : `目の色と背景色のコントラスト比が低いです (${eyeBgContrast.toFixed(1)}:1)`

    const eyeFgContrastText = this._language.isEnglish
      ? `Eye color has low contrast with foreground (${eyeFgContrast.toFixed(1)}:1)`
      : `目の色と前景色のコントラスト比が低いです (${eyeFgContrast.toFixed(1)}:1)`

    // 警告メッセージの配列を構築
    const warningMessages = [
      ...(eyeBgContrast < 3.0 ? [eyeBgContrastText] : []),
      ...(eyeFgContrast < 3.0 ? [eyeFgContrastText] : [])
    ]

    return {
      eyeBgContrast,
      eyeFgContrast,
      hasLowContrast,
      eyeBgContrastText,
      eyeFgContrastText,
      warningMessages
    }
  }
}
