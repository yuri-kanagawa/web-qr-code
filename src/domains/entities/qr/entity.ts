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
import {
  EcLevel,
  EyeSettings,
  LogoSettings,
  QrColors,
  QrSize,
  QrStyle
} from '@/domains/valueObjects/qrSettings'
import { Subject } from '@/domains/valueObjects/subject'
import { Text } from '@/domains/valueObjects/text'
import { Url } from '@/domains/valueObjects/url'
import { WifiPassword } from '@/domains/valueObjects/wifiPassword'
import { WifiSsid } from '@/domains/valueObjects/wifiSsid'
import { WifiType } from '@/domains/valueObjects/wifiType'

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
    // フォームの値
    private _url: Url | undefined,
    private _email: Email | undefined,
    private _subject: Subject | undefined,
    private _body: Body | undefined,
    private _text: Text | undefined,
    private _wifiSsid: WifiSsid | undefined,
    private _wifiPassword: WifiPassword | undefined,
    private _wifiType: WifiType | undefined,
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
      QrValue.default(language) // qrValue
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

  get wifiSsid(): WifiSsid | undefined {
    return this._wifiSsid
  }

  get wifiPassword(): WifiPassword | undefined {
    return this._wifiPassword
  }

  get wifiType(): WifiType | undefined {
    return this._wifiType
  }

  get phoneNumber(): PhoneNumber | undefined {
    return this._phoneNumber
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
    body?: string
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
    device?: string
    os?: string
    // Map
    latitude?: number
    longitude?: number
  } {
    return {
      // URL
      url: this._qrValue.url?.value,
      // Email
      email: this._qrValue.email?.value,
      subject: this._qrValue.subject?.value,
      body: this._qrValue.body?.value,
      // Text
      text: this._qrValue.text?.value,
      // WiFi
      ssid: this._qrValue.wifiSsid?.value,
      password: this._qrValue.wifiPassword?.value,
      type: this._qrValue.wifiType?.value,
      // SMS
      phoneNumber: this._qrValue.phoneNumber?.value,
      body: this._qrValue.body?.value,
      // Contact
      firstName: this._qrValue.firstName?.value,
      lastName: this._qrValue.lastName?.value,
      middleName: this._qrValue.middleName?.value,
      emailContact: this._qrValue.emailContact?.value,
      mobilePhone: this._qrValue.mobilePhone?.value,
      homePhone: this._qrValue.homePhone?.value,
      homeAddress: this._qrValue.homeAddress?.value,
      homeUrl: this._qrValue.homeUrl?.value,
      organization: this._qrValue.organization?.value,
      post: this._qrValue.post?.value,
      workMobile: this._qrValue.workMobile?.value,
      workPhone: this._qrValue.workPhone?.value,
      workAddress: this._qrValue.workAddress?.value,
      workUrl: this._qrValue.workUrl?.value,
      // Device
      device: this._qrValue.device?.value,
      os: this._qrValue.os?.value,
      // Map
      latitude: this._qrValue.latitude?.value,
      longitude: this._qrValue.longitude?.value
    }
  }

  // Change methods for QR settings
  changeEcLevel(ecLevel: EcLevel): QrCode {
    return new QrCode(
      ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
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
      this._longitude
    )
  }

  changeSize(size: QrSize): QrCode {
    return new QrCode(
      this._ecLevel,
      size,
      this._colors,
      this._logo,
      this._eye,
      this._qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
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
      this._longitude
    )
  }

  changeColors(colors: QrColors): QrCode {
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
      this._longitude
    )
  }

  changeLogo(logo: LogoSettings): QrCode {
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
      this._longitude
    )
  }

  changeEye(eye: EyeSettings): QrCode {
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
      this._longitude
    )
  }

  changeQrStyle(qrStyle: QrStyle): QrCode {
    return new QrCode(
      this._ecLevel,
      this._size,
      this._colors,
      this._logo,
      this._eye,
      qrStyle,
      this._language,
      this._enableCORS,
      this._quietZone,
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
      this._longitude
    )
  }

  // Change methods for form values
  changeUrl(url: Url | undefined): QrCode {
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
      url,
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
      this._longitude
    )
  }

  changeEmail(email: Email | undefined): QrCode {
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
      this._url,
      email,
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
      this._longitude
    )
  }

  changeSubject(subject: Subject | undefined): QrCode {
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
      this._url,
      this._email,
      subject,
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
      this._longitude
    )
  }

  changeBody(body: Body | undefined): QrCode {
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
      this._url,
      this._email,
      this._subject,
      body,
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
      this._longitude
    )
  }

  changeText(text: Text | undefined): QrCode {
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
      this._url,
      this._email,
      this._subject,
      this._body,
      text,
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
      this._longitude
    )
  }

  changeWifiSsid(wifiSsid: WifiSsid | undefined): QrCode {
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
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      wifiSsid,
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
      this._longitude
    )
  }

  changeWifiPassword(wifiPassword: WifiPassword | undefined): QrCode {
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
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      wifiPassword,
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
      this._longitude
    )
  }

  changeWifiType(wifiType: WifiType | undefined): QrCode {
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
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      wifiType,
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
      this._longitude
    )
  }

  changePhoneNumber(phoneNumber: PhoneNumber | undefined): QrCode {
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
      this._url,
      this._email,
      this._subject,
      this._body,
      this._text,
      this._wifiSsid,
      this._wifiPassword,
      this._wifiType,
      phoneNumber,
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
      this._longitude
    )
  }
}
