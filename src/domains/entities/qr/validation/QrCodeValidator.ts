import { Language } from '@/domains/valueObjects/language'
import { QrCodeType } from '@/domains/valueObjects/qrCodeType'
import { QrCodeData } from '../data/QrCodeData'

/**
 * バリデーション結果（内部使用）
 */
interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

interface ValidationError {
  field: string
  message: string
}

/**
 * QRコードタイプ別のバリデーションを行うクラス
 */
export class QrCodeValidator {
  /**
   * バリデーションキーの定数（クラス内のみ）
   */
  private static readonly VALIDATION_KEYS = {
    URL: 'url',
    EMAIL: 'email',
    SUBJECT: 'subject',
    BODY: 'body',
    TEXT: 'text',
    PHONE_NUMBER: 'phoneNumber',
    WIFI_SSID: 'wifiSsid',
    WIFI_PASSWORD: 'wifiPassword',
    WIFI_TYPE: 'wifiType',
    CONTACT: 'contact',
    DEVICE: 'device',
    OS: 'os',
    LATITUDE: 'latitude',
    LONGITUDE: 'longitude',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    MIDDLE_NAME: 'middleName',
    EMAIL_CONTACT: 'emailContact',
    MOBILE_PHONE: 'mobilePhone',
    HOME_PHONE: 'homePhone',
    WORK_MOBILE: 'workMobile',
    WORK_PHONE: 'workPhone',
    HOME_ADDRESS: 'homeAddress',
    WORK_ADDRESS: 'workAddress',
    HOME_URL: 'homeUrl',
    WORK_URL: 'workUrl',
    ORGANIZATION: 'organization',
    POST: 'post'
  } as const

  private constructor(private readonly _language: Language) {}

  /**
   * デフォルトのQrCodeValidatorを作成
   */
  static default(language: Language = Language.default()): QrCodeValidator {
    return new QrCodeValidator(language)
  }

  /**
   * QRコードタイプに応じたデータのバリデーション
   */
  validate(qrCodeType: QrCodeType, data: QrCodeData): ValidationResult {
    const errors: ValidationError[] = []

    switch (qrCodeType.value) {
      case QrCodeType.URL:
        this.validateUrl(data, errors)
        break
      case QrCodeType.EMAIL:
        this.validateEmail(data, errors)
        break
      case QrCodeType.TEXT:
        this.validateText(data, errors)
        break
      case QrCodeType.SMS:
        this.validateSms(data, errors)
        break
      case QrCodeType.WIFI:
        this.validateWifi(data, errors)
        break
      case QrCodeType.CONTACT:
        this.validateContact(data, errors)
        break
      case QrCodeType.DEVICE:
        this.validateDevice(data, errors)
        break
      case QrCodeType.MAP:
        this.validateMap(data, errors)
        break
      case QrCodeType.PHONE:
        this.validatePhone(data, errors)
        break
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * URLのバリデーション
   */
  private validateUrl(data: QrCodeData, errors: ValidationError[]): void {
    if (!data.url || data.url.isEmpty) {
      errors.push({
        field: QrCodeValidator.VALIDATION_KEYS.URL,
        message: this._language.isEnglish ? 'URL is required' : 'URLは必須です'
      })
    }
  }

  /**
   * Emailのバリデーション
   * email, subject, bodyのうち少なくとも1つが必須
   */
  private validateEmail(data: QrCodeData, errors: ValidationError[]): void {
    const hasEmail = data.email && !data.email.isEmpty
    const hasSubject = data.subject && !data.subject.isEmpty
    const hasBody = data.body && !data.body.isEmpty

    if (!hasEmail && !hasSubject && !hasBody) {
      errors.push({
        field: QrCodeValidator.VALIDATION_KEYS.EMAIL,
        message: this._language.isEnglish
          ? 'At least one of email, subject, or body is required'
          : 'メールアドレス、件名、本文のいずれか一つは必須です'
      })
    }
  }

  /**
   * Textのバリデーション
   */
  private validateText(data: QrCodeData, errors: ValidationError[]): void {
    if (!data.text || data.text.isEmpty) {
      errors.push({
        field: QrCodeValidator.VALIDATION_KEYS.TEXT,
        message: this._language.isEnglish
          ? 'Text is required'
          : 'テキストは必須です'
      })
    }
  }

  /**
   * SMSのバリデーション
   * phoneNumberとbodyのうち少なくとも1つが必須
   */
  private validateSms(data: QrCodeData, errors: ValidationError[]): void {
    const hasPhoneNumber = data.phoneNumber && !data.phoneNumber.isEmpty
    const hasBody = data.body && !data.body.isEmpty

    if (!hasPhoneNumber && !hasBody) {
      errors.push({
        field: QrCodeValidator.VALIDATION_KEYS.PHONE_NUMBER,
        message: this._language.isEnglish
          ? 'At least one of phone number or message body is required'
          : '電話番号またはメッセージ本文のいずれか一つは必須です'
      })
    }
  }

  /**
   * WiFiのバリデーション
   */
  private validateWifi(data: QrCodeData, errors: ValidationError[]): void {
    if (!data.wifiSsid || data.wifiSsid.isEmpty) {
      errors.push({
        field: QrCodeValidator.VALIDATION_KEYS.WIFI_SSID,
        message: this._language.isEnglish
          ? 'WiFi SSID is required'
          : 'WiFi SSIDは必須です'
      })
    }
  }

  /**
   * Contactのバリデーション
   * Contactはすべてのフィールドがオプション（必須なし）
   */
  private validateContact(data: QrCodeData, errors: ValidationError[]): void {
    // Contactタイプはすべてのフィールドがオプションなので、バリデーションエラーは発生しない
    // 空のContactでも有効なQRコードとして扱う
  }

  /**
   * Deviceのバリデーション
   * device, os, urlのうちいずれかが入力されている場合、全て必須
   */
  private validateDevice(data: QrCodeData, errors: ValidationError[]): void {
    const hasDevice = data.device && data.device.value !== 0 // 0は未選択を表す
    const hasOs = data.os && data.os.value !== 0 // 0は未選択を表す
    const hasUrl = data.url && !data.url.isEmpty

    // いずれかが入力されている場合、全て必須
    if (hasDevice || hasOs || hasUrl) {
      if (!hasDevice) {
        errors.push({
          field: QrCodeValidator.VALIDATION_KEYS.DEVICE,
          message: this._language.isEnglish
            ? 'Device type is required'
            : 'デバイスタイプは必須です'
        })
      }
      if (!hasOs) {
        errors.push({
          field: QrCodeValidator.VALIDATION_KEYS.OS,
          message: this._language.isEnglish
            ? 'OS type is required'
            : 'OSタイプは必須です'
        })
      }
      if (!hasUrl) {
        errors.push({
          field: QrCodeValidator.VALIDATION_KEYS.URL,
          message: this._language.isEnglish
            ? 'URL is required'
            : 'URLは必須です'
        })
      }
    }
  }

  /**
   * Mapのバリデーション
   * latitudeとlongitudeが必須
   */
  private validateMap(data: QrCodeData, errors: ValidationError[]): void {
    if (!data.latitude || data.latitude.value === 0) {
      errors.push({
        field: QrCodeValidator.VALIDATION_KEYS.LATITUDE,
        message: this._language.isEnglish
          ? 'Latitude is required'
          : '緯度は必須です'
      })
    }
    if (!data.longitude || data.longitude.value === 0) {
      errors.push({
        field: QrCodeValidator.VALIDATION_KEYS.LONGITUDE,
        message: this._language.isEnglish
          ? 'Longitude is required'
          : '経度は必須です'
      })
    }
  }

  /**
   * Phoneのバリデーション
   * phoneNumberが必須
   */
  private validatePhone(data: QrCodeData, errors: ValidationError[]): void {
    if (!data.phoneNumber || data.phoneNumber.isEmpty) {
      errors.push({
        field: QrCodeValidator.VALIDATION_KEYS.PHONE_NUMBER,
        message: this._language.isEnglish
          ? 'Phone number is required'
          : '電話番号は必須です'
      })
    }
  }

  /**
   * 特定フィールドのバリデーション
   */
  validateField(
    field: string,
    value: string | undefined,
    qrCodeType: QrCodeType
  ): ValidationError | null {
    const tempData = QrCodeData.default(this._language)

    // 一時的にデータを設定してバリデーション
    let testData: QrCodeData
    switch (field) {
      case 'url':
        testData = tempData.changeUrl(value)
        break
      case 'email':
        testData = tempData.changeEmail(value)
        break
      case 'text':
        testData = tempData.changeText(value)
        break
      case 'phoneNumber':
        testData = tempData.changePhoneNumber(value)
        break
      case 'wifiSsid':
        testData = tempData.changeWifiSsid(value)
        break
      default:
        return null
    }

    const result = this.validate(qrCodeType, testData)
    return result.errors.find((error) => error.field === field) || null
  }
}
