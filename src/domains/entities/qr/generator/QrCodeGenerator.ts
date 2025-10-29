import { DeviceOsService } from '@/domains/services/deviceOs'
import { Language } from '@/domains/valueObjects/language'
import { Qr as QrValue } from '@/domains/valueObjects/qr'
import { QrCodeType } from '@/domains/valueObjects/qrCodeType'
import { PathBuilder } from '@/lib/routing'
import { DeviceQrCodeData } from '../data/DeviceQrCodeData'
import { QrCodeData } from '../data/QrCodeData'

/**
 * QRコードの値を生成するクラス（簡素化版）
 */
export class QrCodeGenerator {
  static generate(
    qrCodeType: QrCodeType,
    data: QrCodeData,
    language: Language,
    deviceData?: DeviceQrCodeData
  ): QrValue {
    switch (qrCodeType.value) {
      case QrCodeType.URL:
        return this.generateUrlQr(data, language)
      case QrCodeType.EMAIL:
        return this.generateEmailQr(data, language)
      case QrCodeType.TEXT:
        return this.generateTextQr(data, language)
      case QrCodeType.SMS:
        return this.generateSmsQr(data, language)
      case QrCodeType.WIFI:
        return this.generateWifiQr(data, language)
      case QrCodeType.CONTACT:
        return this.generateContactQr(data, language)
      case QrCodeType.DEVICE:
        return this.generateDeviceQr(data, language, deviceData)
      case QrCodeType.MAP:
        return this.generateMapQr(data, language)
      case QrCodeType.PHONE:
        return this.generatePhoneQr(data, language)
      default:
        return QrValue.default(language)
    }
  }

  private static generateUrlQr(data: QrCodeData, language: Language): QrValue {
    if (data.url && !data.url.isEmpty) {
      const result = QrValue.create(data.url.value, language)
      return result.qr || QrValue.default(language)
    }
    return QrValue.default(language)
  }

  private static generateEmailQr(
    data: QrCodeData,
    language: Language
  ): QrValue {
    if (data.email && !data.email.isEmpty) {
      const subject = data.subject
        ? `?subject=${encodeURIComponent(data.subject.value)}`
        : ''
      const body = data.body
        ? `&body=${encodeURIComponent(data.body.value)}`
        : ''
      const result = QrValue.create(
        `mailto:${data.email.value}${subject}${body}`,
        language
      )
      return result.qr || QrValue.default(language)
    }
    return QrValue.default(language)
  }

  private static generateTextQr(data: QrCodeData, language: Language): QrValue {
    if (data.text && !data.text.isEmpty) {
      const result = QrValue.create(data.text.value, language)
      return result.qr || QrValue.default(language)
    }
    return QrValue.default(language)
  }

  private static generateSmsQr(data: QrCodeData, language: Language): QrValue {
    if (data.phoneNumber && !data.phoneNumber.isEmpty) {
      const body = data.body
        ? `?body=${encodeURIComponent(data.body.value)}`
        : ''
      const result = QrValue.create(
        `sms:${data.phoneNumber.value}${body}`,
        language
      )
      return result.qr || QrValue.default(language)
    }
    return QrValue.default(language)
  }

  private static generateWifiQr(data: QrCodeData, language: Language): QrValue {
    if (data.wifiSsid && !data.wifiSsid.isEmpty) {
      const password = data.wifiPassword ? `;P:${data.wifiPassword.value}` : ''
      const type = data.wifiType ? `;T:${data.wifiType.value}` : ''
      const result = QrValue.create(
        `WIFI:S:${data.wifiSsid.value}${password}${type};H:false;;`,
        language
      )
      return result.qr || QrValue.default(language)
    }
    return QrValue.default(language)
  }

  private static generateContactQr(
    data: QrCodeData,
    language: Language
  ): QrValue {
    // 最低限の入力が必要（名前またはメールアドレス）
    if (data.firstName || data.lastName || data.emailContact) {
      let vcard = 'BEGIN:VCARD\nVERSION:3.0\n'

      // 名前の処理
      const firstName = data.firstName?.value || ''
      const lastName = data.lastName?.value || ''
      const fullName = `${firstName} ${lastName}`.trim()

      if (fullName) {
        vcard += `FN:${fullName}\n`
        vcard += `N:${lastName};${firstName};;;\n`
      }

      const contactFields = [
        { field: data.emailContact, prefix: 'EMAIL:' },
        { field: data.mobilePhone, prefix: 'TEL:' },
        { field: data.homePhone, prefix: 'TEL;TYPE=HOME:' },
        { field: data.workMobile, prefix: 'TEL;TYPE=WORK:' },
        { field: data.workPhone, prefix: 'TEL;TYPE=WORK:' },
        { field: data.homeAddress, prefix: 'ADR;TYPE=HOME:;;', suffix: ';;;;' },
        { field: data.workAddress, prefix: 'ADR;TYPE=WORK:;;', suffix: ';;;;' },
        { field: data.homeUrl, prefix: 'URL:' },
        { field: data.workUrl, prefix: 'URL;TYPE=WORK:' },
        { field: data.organization, prefix: 'ORG:' },
        { field: data.post, prefix: 'TITLE:' }
      ]

      contactFields.forEach(({ field, prefix, suffix = '' }) => {
        if (field && field.value) vcard += `${prefix}${field.value}${suffix}\n`
      })

      vcard += 'END:VCARD'
      const result = QrValue.create(vcard, language)
      return result.qr || QrValue.default(language)
    }
    return QrValue.default(language)
  }

  private static generateDeviceQr(
    data: QrCodeData,
    language: Language,
    deviceData?: DeviceQrCodeData
  ): QrValue {
    if (!deviceData) {
      return QrValue.default(language)
    }

    const pathBuilder = new PathBuilder(language)
    const redirectPath = pathBuilder.device.redirect
    const baseUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${redirectPath}`

    const validDeviceOsUrls = deviceData.getValidDeviceOsUrls()

    if (validDeviceOsUrls.length === 0) {
      const result = QrValue.create(baseUrl, language)
      return result.qr || QrValue.default(language)
    }

    const deviceOsParams = validDeviceOsUrls
      .map(({ device, os }) => DeviceOsService.getDeviceOs(device, os))
      .join(',')

    const urlsParams = validDeviceOsUrls
      .map(({ url }) => encodeURIComponent(url.value))
      .join(',')

    if (!deviceOsParams || !urlsParams) {
      const result = QrValue.create(baseUrl, language)
      return result.qr || QrValue.default(language)
    }

    const redirectUrl = `${baseUrl}?deviceOs=${deviceOsParams}&urls=${urlsParams}`
    const result = QrValue.create(redirectUrl, language)
    return result.qr || QrValue.default(language)
  }

  private static generateMapQr(data: QrCodeData, language: Language): QrValue {
    if (data.latitude && data.longitude) {
      const result = QrValue.create(
        `geo:${data.latitude.value},${data.longitude.value}`,
        language
      )
      return result.qr || QrValue.default(language)
    }
    return QrValue.default(language)
  }

  private static generatePhoneQr(
    data: QrCodeData,
    language: Language
  ): QrValue {
    if (data.phoneNumber && !data.phoneNumber.isEmpty) {
      const telValue = `tel:${data.phoneNumber.value}`
      const result = QrValue.create(telValue, language)
      return result.qr || QrValue.default(language)
    }
    return QrValue.default(language)
  }
}
