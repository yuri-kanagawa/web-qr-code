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
import { Subject } from '@/domains/valueObjects/subject'
import { Text } from '@/domains/valueObjects/text'
import { Url } from '@/domains/valueObjects/url'
import { WiFiPassword } from '@/domains/valueObjects/wifiPassword'
import { WiFiSsid } from '@/domains/valueObjects/wifiSsid'
import { WiFiType } from '@/domains/valueObjects/wifiType'

/**
 * QRコードのフォームデータを管理するクラス（簡素化版）
 */
export class QrCodeData {
  private constructor(
    private _url: Url,
    private _email: Email,
    private _subject: Subject,
    private _body: Body,
    private _text: Text,
    private _wifiSsid: WiFiSsid,
    private _wifiPassword: WiFiPassword,
    private _wifiType: WiFiType,
    private _phoneNumber: PhoneNumber,
    private _firstName: Name,
    private _lastName: Name,
    private _middleName: Name,
    private _emailContact: Email,
    private _mobilePhone: PhoneNumber,
    private _homePhone: PhoneNumber,
    private _homeAddress: Address,
    private _homeUrl: Url,
    private _organization: Organization,
    private _post: Post,
    private _workMobile: PhoneNumber,
    private _workPhone: PhoneNumber,
    private _workAddress: Address,
    private _workUrl: Url,
    private _device: Device,
    private _os: Os,
    private _latitude: Latitude,
    private _longitude: Longitude,
    private readonly _language: Language
  ) {}

  static default(language: Language = Language.default()): QrCodeData {
    return new QrCodeData(
      Url.empty(language),
      Email.empty(language),
      Subject.empty(language),
      Body.empty(language),
      Text.empty(language),
      WiFiSsid.empty(language),
      WiFiPassword.empty(language),
      WiFiType.empty(language),
      PhoneNumber.empty(language),
      Name.empty(language),
      Name.empty(language),
      Name.empty(language),
      Email.empty(language),
      PhoneNumber.empty(language),
      PhoneNumber.empty(language),
      Address.empty(language),
      Url.empty(language),
      Organization.empty(language),
      Post.empty(language),
      PhoneNumber.empty(language),
      PhoneNumber.empty(language),
      Address.empty(language),
      Url.empty(language),
      Device.notSet(language),
      Os.notSet(language),
      Latitude.default(language),
      Longitude.default(language),
      language
    )
  }

  // 直接アクセス可能なプロパティ
  get url() {
    return this._url
  }
  get email() {
    return this._email
  }
  get subject() {
    return this._subject
  }
  get body() {
    return this._body
  }
  get text() {
    return this._text
  }
  get wifiSsid() {
    return this._wifiSsid
  }
  get wifiPassword() {
    return this._wifiPassword
  }
  get wifiType() {
    return this._wifiType
  }
  get phoneNumber() {
    return this._phoneNumber
  }
  get firstName() {
    return this._firstName
  }
  get lastName() {
    return this._lastName
  }
  get middleName() {
    return this._middleName
  }
  get emailContact() {
    return this._emailContact
  }
  get mobilePhone() {
    return this._mobilePhone
  }
  get homePhone() {
    return this._homePhone
  }
  get homeAddress() {
    return this._homeAddress
  }
  get homeUrl() {
    return this._homeUrl
  }
  get organization() {
    return this._organization
  }
  get post() {
    return this._post
  }
  get workMobile() {
    return this._workMobile
  }
  get workPhone() {
    return this._workPhone
  }
  get workAddress() {
    return this._workAddress
  }
  get workUrl() {
    return this._workUrl
  }
  get device() {
    return this._device
  }
  get os() {
    return this._os
  }
  get latitude() {
    return this._latitude
  }
  get longitude() {
    return this._longitude
  }

  get language() {
    return this._language
  }

  // 汎用的な更新メソッド
  update(updater: (data: QrCodeData) => QrCodeData): QrCodeData {
    return updater(this)
  }

  // よく使われる変更メソッドのみ
  changeUrl(url: string): QrCodeData {
    const result = Url.create(url, this._language)
    if (result.isFailure || !result.url) {
      return this
    }
    return this.copy({ url: result.url })
  }

  changeEmail(email: string): QrCodeData {
    const result = Email.create(email, this._language)
    if (result.isFailure || !result.email) {
      return this
    }
    return this.copy({ email: result.email })
  }

  changeSubject(subject: string): QrCodeData {
    const result = Subject.create(subject, this._language)
    if (result.isFailure || !result.subject) {
      return this
    }
    return this.copy({ subject: result.subject })
  }

  changeBody(body: string): QrCodeData {
    const result = Body.create(body, this._language)
    if (result.isFailure || !result.body) {
      return this
    }
    return this.copy({ body: result.body })
  }

  changeText(text: string): QrCodeData {
    const result = Text.create(text, this._language)
    if (result.isFailure || !result.text) {
      return this
    }
    return this.copy({ text: result.text })
  }

  changeWifiSsid(wifiSsid: string): QrCodeData {
    const result = WiFiSsid.create(wifiSsid, this._language)
    if (result.isFailure || !result.wifiSsid) {
      return this
    }
    return this.copy({ wifiSsid: result.wifiSsid })
  }

  changeWifiPassword(wifiPassword: string): QrCodeData {
    const result = WiFiPassword.create(wifiPassword, this._language)
    if (result.isFailure || !result.wifiPassword) {
      return this
    }
    return this.copy({ wifiPassword: result.wifiPassword })
  }

  changeWifiType(wifiType: string): QrCodeData {
    const result = WiFiType.create(wifiType, this._language)
    if (result.isFailure || !result.wifiType) {
      return this
    }
    return this.copy({ wifiType: result.wifiType })
  }

  changePhoneNumber(phoneNumber: string): QrCodeData {
    const result = PhoneNumber.create(phoneNumber, this._language)
    if (result.isFailure || !result.phoneNumber) {
      return this
    }
    return this.copy({ phoneNumber: result.phoneNumber })
  }

  // フォームの値のオブジェクト形式でのアクセス
  get value() {
    return {
      url: this._url?.value,
      email: this._email?.value,
      subject: this._subject?.value,
      body: this._body?.value,
      text: this._text?.value,
      ssid: this._wifiSsid?.value,
      password: this._wifiPassword?.value,
      type: this._wifiType?.value,
      phoneNumber: this._phoneNumber?.value,
      smsBody: this._body?.value,
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
      device: this._device?.value,
      os: this._os?.value,
      latitude: this._latitude?.value,
      longitude: this._longitude?.value
    }
  }

  private copy(
    updates: Partial<{
      url: Url | undefined
      email: Email | undefined
      subject: Subject | undefined
      body: Body | undefined
      text: Text | undefined
      wifiSsid: WiFiSsid | undefined
      wifiPassword: WiFiPassword | undefined
      wifiType: WiFiType | undefined
      phoneNumber: PhoneNumber | undefined
      firstName: Name | undefined
      lastName: Name | undefined
      middleName: Name | undefined
      emailContact: Email | undefined
      mobilePhone: PhoneNumber | undefined
      homePhone: PhoneNumber | undefined
      homeAddress: Address | undefined
      homeUrl: Url | undefined
      organization: Organization | undefined
      post: Post | undefined
      workMobile: PhoneNumber | undefined
      workPhone: PhoneNumber | undefined
      workAddress: Address | undefined
      workUrl: Url | undefined
      device: Device | undefined
      os: Os | undefined
      latitude: Latitude | undefined
      longitude: Longitude | undefined
    }>
  ): QrCodeData {
    return new QrCodeData(
      updates.url ?? this._url,
      updates.email ?? this._email,
      updates.subject ?? this._subject,
      updates.body ?? this._body,
      updates.text ?? this._text,
      updates.wifiSsid ?? this._wifiSsid,
      updates.wifiPassword ?? this._wifiPassword,
      updates.wifiType ?? this._wifiType,
      updates.phoneNumber ?? this._phoneNumber,
      updates.firstName ?? this._firstName,
      updates.lastName ?? this._lastName,
      updates.middleName ?? this._middleName,
      updates.emailContact ?? this._emailContact,
      updates.mobilePhone ?? this._mobilePhone,
      updates.homePhone ?? this._homePhone,
      updates.homeAddress ?? this._homeAddress,
      updates.homeUrl ?? this._homeUrl,
      updates.organization ?? this._organization,
      updates.post ?? this._post,
      updates.workMobile ?? this._workMobile,
      updates.workPhone ?? this._workPhone,
      updates.workAddress ?? this._workAddress,
      updates.workUrl ?? this._workUrl,
      updates.device ?? this._device,
      updates.os ?? this._os,
      updates.latitude ?? this._latitude,
      updates.longitude ?? this._longitude,
      this._language
    )
  }
}
