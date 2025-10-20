import { Language } from '@/domains/valueObjects/language'
import { Qr as QrValue } from '@/domains/valueObjects/qr'
import { QrCodeType } from '@/domains/valueObjects/qrCodeType'
import { DeviceQrCodeData } from './data/DeviceQrCodeData'
import { QrCodeData } from './data/QrCodeData'
import { QrCodeGenerator } from './generator/QrCodeGenerator'
import { QrCodeSettings } from './settings/QrCodeSettings'
import { QrCodeValidator } from './validation/QrCodeValidator'

/**
 * バリデーション結果
 */
export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

/**
 * バリデーションエラー
 */
export interface ValidationError {
  field: string
  message: string
}

/**
 * QRコードのEntity（集約ルート）
 *
 * 大幅に簡素化されたバージョン
 */
export class QrCode {
  private constructor(
    private _settings: QrCodeSettings,
    private _data: QrCodeData,
    private _deviceData: DeviceQrCodeData | undefined,
    private _qrCodeType: QrCodeType,
    private readonly _language: Language,
    private readonly _validator: QrCodeValidator
  ) {}

  /**
   * デフォルトのQrを作成
   */
  static default(language: Language = Language.default()): QrCode {
    const settings = QrCodeSettings.default(language)
    // logoFileを確実にnullにリセット
    const resetSettings = settings.changeLogoFile(null)
    return new QrCode(
      resetSettings,
      QrCodeData.default(language),
      undefined,
      QrCodeType.default(),
      language,
      QrCodeValidator.default(language)
    )
  }

  /**
   * URLタイプのQrを作成
   */
  static createUrl(language: Language): QrCode {
    return QrCode.default(language).updateQrCodeType((qrCodeType) =>
      qrCodeType.changeToUrl()
    )
  }

  /**
   * EmailタイプのQrを作成
   */
  static createEmail(language: Language): QrCode {
    return QrCode.default(language).updateQrCodeType((qrCodeType) =>
      qrCodeType.changeToEmail()
    )
  }

  /**
   * TextタイプのQrを作成
   */
  static createText(language: Language): QrCode {
    return QrCode.default(language).updateQrCodeType((qrCodeType) =>
      qrCodeType.changeToText()
    )
  }

  /**
   * SMSタイプのQrを作成
   */
  static createSms(language: Language): QrCode {
    return QrCode.default(language).updateQrCodeType((qrCodeType) =>
      qrCodeType.changeToSms()
    )
  }

  /**
   * WiFiタイプのQrを作成
   */
  static createWifi(language: Language): QrCode {
    return QrCode.default(language).updateQrCodeType((qrCodeType) =>
      qrCodeType.changeToWifi()
    )
  }

  /**
   * ContactタイプのQrを作成
   */
  static createContact(language: Language): QrCode {
    return QrCode.default(language).updateQrCodeType((qrCodeType) =>
      qrCodeType.changeToContact()
    )
  }

  /**
   * DeviceタイプのQrを作成
   */
  static createDevice(language: Language): QrCode {
    return QrCode.default(language)
      .updateQrCodeType((qrCodeType) => qrCodeType.changeToDevice())
      .updateDeviceData(DeviceQrCodeData.default(language))
  }

  /**
   * MapタイプのQrを作成
   */
  static createMap(language: Language): QrCode {
    return QrCode.default(language).updateQrCodeType((qrCodeType) =>
      qrCodeType.changeToMap()
    )
  }

  /**
   * PhoneタイプのQrを作成
   */
  static createPhone(language: Language): QrCode {
    return QrCode.default(language).updateQrCodeType((qrCodeType) =>
      qrCodeType.changeToPhone()
    )
  }

  // 直接アクセス可能なプロパティ
  get settings() {
    return this._settings
  }

  get data() {
    return this._data
  }

  get deviceData() {
    return this._deviceData
  }

  // 便利なプロパティ（よく使われるもの）
  get colors() {
    return this._settings.colors
  }

  get eye() {
    return this._settings.eye
  }

  get language(): Language {
    return this._language
  }

  get qrCodeType(): QrCodeType {
    return this._qrCodeType
  }

  // WiFi関連のプロパティ
  get wifiSsid() {
    return this._data.wifiSsid
  }

  get wifiPassword() {
    return this._data.wifiPassword
  }

  get wifiType() {
    return this._data.wifiType
  }

  get url() {
    return this._data.url
  }

  get email() {
    return this._data.email
  }

  get subject() {
    return this._data.subject
  }

  get body() {
    return this._data.body
  }

  get text() {
    return this._data.text
  }

  get phoneNumber() {
    return this._data.phoneNumber
  }

  get firstName() {
    return this._data.firstName
  }

  get lastName() {
    return this._data.lastName
  }

  get middleName() {
    return this._data.middleName
  }

  get emailContact() {
    return this._data.emailContact
  }

  get mobilePhone() {
    return this._data.mobilePhone
  }

  get homePhone() {
    return this._data.homePhone
  }

  get homeAddress() {
    return this._data.homeAddress
  }

  get homeUrl() {
    return this._data.homeUrl
  }

  get organization() {
    return this._data.organization
  }

  get post() {
    return this._data.post
  }

  get workMobile() {
    return this._data.workMobile
  }

  get workPhone() {
    return this._data.workPhone
  }

  get workAddress() {
    return this._data.workAddress
  }

  get workUrl() {
    return this._data.workUrl
  }

  get device() {
    return this._data.device
  }

  get os() {
    return this._data.os
  }

  get latitude() {
    return this._data.latitude
  }

  get longitude() {
    return this._data.longitude
  }

  // QRコードの値を生成
  get qrValue(): QrValue {
    const generatedValue = QrCodeGenerator.generate(
      this._qrCodeType,
      this._data,
      this._language,
      this._deviceData
    )
    console.log('qrValue getter - generatedValue.value:', generatedValue.value)
    return generatedValue
  }

  // フォームの値のオブジェクト形式でのアクセス
  get value() {
    return this._data.value
  }

  // 汎用的な更新メソッド
  updateSettings(
    updater: (settings: QrCodeSettings) => QrCodeSettings
  ): QrCode {
    return new QrCode(
      updater(this._settings),
      this._data,
      this._deviceData,
      this._qrCodeType,
      this._language,
      this._validator
    )
  }

  updateData(updater: (data: QrCodeData) => QrCodeData): QrCode {
    return new QrCode(
      this._settings,
      updater(this._data),
      this._deviceData,
      this._qrCodeType,
      this._language,
      this._validator
    )
  }

  updateQrCodeType(updater: (qrCodeType: QrCodeType) => QrCodeType): QrCode {
    return new QrCode(
      this._settings,
      this._data,
      this._deviceData,
      updater(this._qrCodeType),
      this._language,
      this._validator
    )
  }

  updateDeviceData(deviceData: DeviceQrCodeData | undefined): QrCode {
    return new QrCode(
      this._settings,
      this._data,
      deviceData,
      this._qrCodeType,
      this._language,
      this._validator
    )
  }

  // 便利メソッド（よく使われるもののみ）
  changeUrl(url: string | undefined): QrCode {
    return this.updateData((data) => data.changeUrl(url))
  }

  changeEmail(email: string | undefined): QrCode {
    return this.updateData((data) => data.changeEmail(email))
  }

  changeSubject(subject: string | undefined): QrCode {
    return this.updateData((data) => data.changeSubject(subject))
  }

  changeBody(body: string | undefined): QrCode {
    return this.updateData((data) => data.changeBody(body))
  }

  changeText(text: string | undefined): QrCode {
    return this.updateData((data) => data.changeText(text))
  }

  changePhoneNumber(phoneNumber: string | undefined): QrCode {
    return this.updateData((data) => data.changePhoneNumber(phoneNumber))
  }

  changeToUrl(): QrCode {
    return this.updateQrCodeType((qrCodeType) => qrCodeType.changeToUrl())
  }

  // WiFi関連のメソッド
  changeWifiSsid(wifiSsid: string | undefined): QrCode {
    return this.updateData((data) => data.changeWifiSsid(wifiSsid))
  }

  changeWifiPassword(wifiPassword: string | undefined): QrCode {
    return this.updateData((data) => data.changeWifiPassword(wifiPassword))
  }

  changeWifiType(wifiType: number | undefined): QrCode {
    return this.updateData((data) => data.changeWifiType(wifiType))
  }

  changeToWifi(): QrCode {
    return this.updateQrCodeType((qrCodeType) => qrCodeType.changeToWifi())
  }

  changeToEmail(): QrCode {
    return this.updateQrCodeType((qrCodeType) => qrCodeType.changeToEmail())
  }

  changeToText(): QrCode {
    return this.updateQrCodeType((qrCodeType) => qrCodeType.changeToText())
  }

  changeToSms(): QrCode {
    return this.updateQrCodeType((qrCodeType) => qrCodeType.changeToSms())
  }

  changeToContact(): QrCode {
    return this.updateQrCodeType((qrCodeType) => qrCodeType.changeToContact())
  }

  changeToDevice(): QrCode {
    return this.updateQrCodeType((qrCodeType) => qrCodeType.changeToDevice())
  }

  changeToMap(): QrCode {
    return this.updateQrCodeType((qrCodeType) => qrCodeType.changeToMap())
  }

  changeToPhone(): QrCode {
    return this.updateQrCodeType((qrCodeType) => qrCodeType.changeToPhone())
  }

  // 色設定の変更
  changeColors(
    fgColor: string,
    bgColor: string,
    eyeColor1: string,
    eyeColor2: string,
    eyeColor3: string
  ): QrCode {
    return this.updateSettings((settings) =>
      settings.changeColors(fgColor, bgColor, eyeColor1, eyeColor2, eyeColor3)
    )
  }

  // 目の設定の変更
  changeEye(radius1: number, radius2: number, radius3: number): QrCode {
    return this.updateSettings((settings) =>
      settings.changeEye(radius1, radius2, radius3)
    )
  }

  // QRコードの有効性をチェック
  isValid(): boolean {
    const result = !!this.qrValue.value && this.qrValue.value.trim() !== ''
    console.log('isValid - qrValue:', this.qrValue.value, 'result:', result)
    return result
  }

  // ドメイン層でのバリデーション
  validate(): ValidationResult {
    return this._validator.validate(this._qrCodeType, this._data)
  }

  // 特定フィールドのバリデーション
  validateField(
    field: string,
    value: string | undefined
  ): ValidationError | null {
    return this._validator.validateField(field, value, this._qrCodeType)
  }

  // フィールド別のバリデーション結果を取得（ZodのformState.errorsと同等）
  getFieldErrors(): Record<string, ValidationError> {
    const validationResult = this.validate()
    const fieldErrors: Record<string, ValidationError> = {}

    validationResult.errors.forEach((error) => {
      fieldErrors[error.field] = error
    })

    return fieldErrors
  }

  // 特定フィールドのエラーメッセージを取得
  getFieldErrorMessage(field: string): string | undefined {
    const fieldErrors = this.getFieldErrors()
    return fieldErrors[field]?.message
  }

  // 特定フィールドが有効かどうかを取得
  isFieldValid(field: string): boolean {
    const fieldErrors = this.getFieldErrors()
    return !fieldErrors[field]
  }

  // 全体的なバリデーション状態（ZodのisValidと同等）
  get isValidForm(): boolean {
    return this.validate().isValid
  }

  // QRコードの内容を取得（確認用）
  getContent(): string {
    return this.qrValue.value
  }

  // 目の色のコントラスト比チェック（委譲）
  getLeftTopEyeContrastInfo() {
    return this._settings.getLeftTopEyeContrastInfo()
  }

  getRightTopEyeContrastInfo() {
    return this._settings.getRightTopEyeContrastInfo()
  }

  getLeftBottomEyeContrastInfo() {
    return this._settings.getLeftBottomEyeContrastInfo()
  }
}
