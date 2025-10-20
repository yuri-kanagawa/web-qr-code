import { Language } from '@/domains/valueObjects/language'
import { Qr as QrValue } from '@/domains/valueObjects/qr'
import { QrCodeType } from '@/domains/valueObjects/qrCodeType'
import { QrCodeData } from '../data/QrCodeData'

/**
 * QRコードの値を生成するクラス（簡素化版）
 */
export class QrCodeGenerator {
  static generate(
    qrCodeType: QrCodeType,
    data: QrCodeData,
    language: Language
  ): QrValue {
    console.log('generateQrValue - qrCodeType.value:', qrCodeType.value)

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
        return this.generateDeviceQr(data, language)
      case QrCodeType.MAP:
        return this.generateMapQr(data, language)
      case QrCodeType.PHONE:
        return this.generatePhoneQr(data, language)
      default:
        return QrValue.default()
    }
  }

  private static generateUrlQr(data: QrCodeData, language: Language): QrValue {
    console.log(
      'generateQrValue URL case - _url:',
      data.url,
      'isEmpty:',
      data.url?.isEmpty
    )
    if (data.url && !data.url.isEmpty) {
      console.log('generateQrValue URL case - _url.value:', data.url.value)
      const result = QrValue.create(data.url.value, language)
      console.log('generateQrValue URL case - QrValue.create result:', result)
      return result.qr || QrValue.default()
    }
    console.log('generateQrValue URL case - returning default')
    return QrValue.default()
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
      return result.qr || QrValue.default()
    }
    return QrValue.default()
  }

  private static generateTextQr(data: QrCodeData, language: Language): QrValue {
    if (data.text && !data.text.isEmpty) {
      const result = QrValue.create(data.text.value, language)
      return result.qr || QrValue.default()
    }
    return QrValue.default()
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
      return result.qr || QrValue.default()
    }
    return QrValue.default()
  }

  private static generateWifiQr(data: QrCodeData, language: Language): QrValue {
    if (data.wifiSsid && !data.wifiSsid.isEmpty) {
      const password = data.wifiPassword ? `;P:${data.wifiPassword.value}` : ''
      const type = data.wifiType ? `;T:${data.wifiType.value}` : ''
      const result = QrValue.create(
        `WIFI:S:${data.wifiSsid.value}${password}${type};H:false;;`,
        language
      )
      return result.qr || QrValue.default()
    }
    return QrValue.default()
  }

  private static generateContactQr(
    data: QrCodeData,
    language: Language
  ): QrValue {
    if (data.firstName || data.lastName || data.emailContact) {
      let vcard = 'BEGIN:VCARD\nVERSION:3.0\n'

      if (data.firstName || data.lastName) {
        vcard += `FN:${data.firstName?.value || ''} ${data.lastName?.value || ''}\n`
        vcard += `N:${data.lastName?.value || ''};${data.firstName?.value || ''};;;\n`
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
        if (field) vcard += `${prefix}${field.value}${suffix}\n`
      })

      vcard += 'END:VCARD'
      const result = QrValue.create(vcard, language)
      return result.qr || QrValue.default()
    }
    return QrValue.default()
  }

  private static generateDeviceQr(
    data: QrCodeData,
    language: Language
  ): QrValue {
    if (data.device && data.os) {
      const deviceInfo = `DEVICE:${data.device.value}:${data.os.value}`
      const result = QrValue.create(deviceInfo, language)
      return result.qr || QrValue.default()
    }
    return QrValue.default()
  }

  private static generateMapQr(data: QrCodeData, language: Language): QrValue {
    if (data.latitude && data.longitude) {
      const result = QrValue.create(
        `geo:${data.latitude.value},${data.longitude.value}`,
        language
      )
      return result.qr || QrValue.default()
    }
    return QrValue.default()
  }

  private static generatePhoneQr(
    data: QrCodeData,
    language: Language
  ): QrValue {
    console.log('generateQrValue phone case, _phoneNumber:', data.phoneNumber)
    if (data.phoneNumber && !data.phoneNumber.isEmpty) {
      const telValue = `tel:${data.phoneNumber.value}`
      console.log('generateQrValue phone telValue:', telValue)
      const result = QrValue.create(telValue, language)
      return result.qr || QrValue.default()
    }
    console.log('generateQrValue phone case, _phoneNumber is undefined')
    return QrValue.default()
  }
}
