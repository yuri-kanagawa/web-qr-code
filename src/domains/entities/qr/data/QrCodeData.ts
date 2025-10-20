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
    private readonly _language: Language
  ) {}

  static default(language: Language = Language.default()): QrCodeData {
    return new QrCodeData(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
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
  changeUrl(url: string | undefined): QrCodeData {
    let urlValueObject: Url | undefined = undefined
    if (url !== undefined && url.trim() !== '') {
      const result = Url.create(url, this._language)
      console.log('changeUrl - input:', url, 'result:', result)
      if (result.isSuccess && result.url) {
        urlValueObject = result.url
        console.log('changeUrl - urlValueObject set:', urlValueObject.value)
      } else {
        console.log('changeUrl - Url.create failed:', result.error)
      }
    }
    return this.copy({ url: urlValueObject })
  }

  changeEmail(email: string | undefined): QrCodeData {
    let emailValueObject: Email | undefined = undefined
    if (email !== undefined && email.trim() !== '') {
      const result = Email.create(email, this._language)
      if (result.isSuccess && result.email) {
        emailValueObject = result.email
      }
    }
    return this.copy({ email: emailValueObject })
  }

  changeSubject(subject: string | undefined): QrCodeData {
    let subjectValueObject: Subject | undefined = undefined
    if (subject !== undefined && subject.trim() !== '') {
      const result = Subject.create(subject, this._language)
      if (result.isSuccess && result.subject) {
        subjectValueObject = result.subject
      }
    }
    return this.copy({ subject: subjectValueObject })
  }

  changeBody(body: string | undefined): QrCodeData {
    let bodyValueObject: Body | undefined = undefined
    if (body !== undefined && body.trim() !== '') {
      const result = Body.create(body, this._language)
      if (result.isSuccess && result.body) {
        bodyValueObject = result.body
      }
    }
    return this.copy({ body: bodyValueObject })
  }

  changeText(text: string | undefined): QrCodeData {
    let textValueObject: Text | undefined = undefined
    if (text !== undefined && text.trim() !== '') {
      const result = Text.create(text, this._language)
      if (result.isSuccess && result.text) {
        textValueObject = result.text
      }
    }
    return this.copy({ text: textValueObject })
  }

  changeWifiSsid(wifiSsid: string | undefined): QrCodeData {
    let wifiSsidValueObject: WiFiSsid | undefined = undefined
    if (wifiSsid !== undefined && wifiSsid.trim() !== '') {
      const result = WiFiSsid.create(wifiSsid, this._language)
      if (result.isSuccess && result.wifiSsid) {
        wifiSsidValueObject = result.wifiSsid
      }
    }
    return this.copy({ wifiSsid: wifiSsidValueObject })
  }

  changeWifiPassword(wifiPassword: string | undefined): QrCodeData {
    let wifiPasswordValueObject: WiFiPassword | undefined = undefined
    if (wifiPassword !== undefined && wifiPassword.trim() !== '') {
      const result = WiFiPassword.create(wifiPassword, this._language)
      if (result.isSuccess && result.wifiPassword) {
        wifiPasswordValueObject = result.wifiPassword
      }
    }
    return this.copy({ wifiPassword: wifiPasswordValueObject })
  }

  changeWifiType(wifiType: number | undefined): QrCodeData {
    let wifiTypeValueObject: WiFiType | undefined = undefined
    if (wifiType !== undefined) {
      const result = WiFiType.create(wifiType.toString(), this._language)
      if (result.isSuccess && result.wifiType) {
        wifiTypeValueObject = result.wifiType
      }
    }
    return this.copy({ wifiType: wifiTypeValueObject })
  }

  changePhoneNumber(phoneNumber: string | undefined): QrCodeData {
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
    return this.copy({ phoneNumber: phoneNumberValueObject })
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
