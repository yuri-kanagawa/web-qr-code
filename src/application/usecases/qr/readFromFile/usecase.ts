import { QrCode } from '@/domains'
import { IQrScannerRepository } from '@/domains/repositories/external/qrScanner'
import { DeviceOsService } from '@/domains/services/deviceOs'
import { Device } from '@/domains/valueObjects/device'
import { Language } from '@/domains/valueObjects/language'
import { Os } from '@/domains/valueObjects/os'
import { Qr as QrValue } from '@/domains/valueObjects/qr'
import { Url } from '@/domains/valueObjects/url'
import { ReadQrFromFileUseCaseResult } from './result'

/**
 * ファイルからQRコードを読み取るユースケース
 */
export class ReadQrFromFileUseCase {
  constructor(
    private readonly qrScannerRepository: IQrScannerRepository,
    private readonly language: Language
  ) {}

  /**
   * ファイルからQRコードを読み取る
   * @param file - 読み取り対象のファイル
   * @returns ReadQrFromFileUseCaseResult - 成功/失敗の結果
   */
  async execute(file: File): Promise<ReadQrFromFileUseCaseResult> {
    // ファイルからObjectURLを生成
    const objectUrl = URL.createObjectURL(file)

    try {
      // QRコードをスキャン（外部リポジトリ使用）
      const result = await this.qrScannerRepository.scanFromImageUrl(objectUrl)

      // QrValueを作成
      const qrValueResult = QrValue.create(result.data, this.language)

      if (qrValueResult.isFailure || !qrValueResult.qr) {
        return ReadQrFromFileUseCaseResult.fail(
          new Error(qrValueResult.error?.message || 'Invalid QR code')
        )
      }

      // QrValueからQrCodeを作成
      const qrCode = this.createQrCodeFromQrValue(qrValueResult.qr)

      return ReadQrFromFileUseCaseResult.ok(qrCode)
    } catch (error) {
      // スキャンエラーをキャッチして結果オブジェクトに変換
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to scan QR code'
      return ReadQrFromFileUseCaseResult.fail(new Error(errorMessage))
    } finally {
      // ObjectURLを解放
      URL.revokeObjectURL(objectUrl)
    }
  }

  /**
   * QrValueからQrCodeを作成
   */
  private createQrCodeFromQrValue(qrValue: QrValue): QrCode {
    // WiFiの場合
    if (qrValue.value.startsWith('WIFI:')) {
      return this.parseWifiQr(qrValue)
    }

    // Contact（vCard）の場合
    if (qrValue.isVcard) {
      return this.parseVCardQr(qrValue)
    }

    // DeviceリダイレクトURLの場合
    if (qrValue.isDeviceRedirectUrl) {
      return this.parseDeviceQr(qrValue)
    }

    // Mapの場合
    if (qrValue.isMap) {
      const qrCode = QrCode.createMap(this.language)
      return qrCode.updateData((qrData) => qrData.changeUrl(qrValue.value))
    }

    // メールの場合
    if (qrValue.isEmail) {
      return this.parseEmailQr(qrValue)
    }

    // SMSの場合
    if (qrValue.isSms) {
      return this.parseSmsQr(qrValue)
    }

    // 電話番号の場合
    if (qrValue.isTel) {
      const qrCode = QrCode.createPhone(this.language)
      const phoneNumber = qrValue.value.replace('tel:', '')
      return qrCode.updateData((qrData) =>
        qrData.changePhoneNumber(phoneNumber)
      )
    }

    // URLの場合
    if (qrValue.isUrl) {
      const qrCode = QrCode.createUrl(this.language)
      return qrCode.updateData((qrData) => qrData.changeUrl(qrValue.value))
    }

    // テキストの場合（デフォルト）
    const qrCode = QrCode.createText(this.language)
    return qrCode.updateData((qrData) => qrData.changeText(qrValue.value))
  }

  /**
   * WiFi QRコードをパース
   */
  private parseWifiQr(qrValue: QrValue): QrCode {
    const qrCode = QrCode.createWifi(this.language)
    const wifiData = qrValue.parseWifi()

    return qrCode.updateData((qrData) => {
      let data = qrData
      if (wifiData.ssid) {
        data = data.changeWifiSsid(wifiData.ssid)
      }
      if (wifiData.password) {
        data = data.changeWifiPassword(wifiData.password)
      }
      if (wifiData.type !== undefined) {
        data = data.changeWifiType(wifiData.type.toString())
      }
      return data
    })
  }

  /**
   * Email QRコードをパース
   */
  private parseEmailQr(qrValue: QrValue): QrCode {
    const qrCode = QrCode.createEmail(this.language)
    const emailData = qrValue.parseEmail()

    return qrCode.updateData((qrData) => {
      let data = qrData
      if (emailData.email) {
        data = data.changeEmail(emailData.email)
      }
      if (emailData.subject) {
        data = data.changeSubject(emailData.subject)
      }
      if (emailData.body) {
        data = data.changeBody(emailData.body)
      }
      return data
    })
  }

  /**
   * SMS QRコードをパース
   */
  private parseSmsQr(qrValue: QrValue): QrCode {
    const qrCode = QrCode.createSms(this.language)
    const smsData = qrValue.parseSms()

    return qrCode.updateData((qrData) => {
      let data = qrData
      if (smsData.phoneNumber) {
        data = data.changePhoneNumber(smsData.phoneNumber)
      }
      if (smsData.body) {
        data = data.changeBody(smsData.body)
      }
      return data
    })
  }

  /**
   * Device QRコードをパース
   */
  private parseDeviceQr(qrValue: QrValue): QrCode {
    const qrCode = QrCode.createDevice(this.language)

    try {
      const url = new URL(qrValue.value)
      const deviceOsParam = url.searchParams.get('deviceOs')
      const urlsParam = url.searchParams.get('urls')

      // クエリパラメータがない場合はURLのみ保存
      if (!deviceOsParam || !urlsParam) {
        return qrCode.updateData((qrData) => qrData.changeUrl(qrValue.value))
      }

      // デバイスとURLのリストを取得
      const deviceOsList = deviceOsParam.split(',')
      const urlList = urlsParam.split(',').map((u) => decodeURIComponent(u))

      // DeviceQrCodeDataにデータを設定
      const deviceData = qrCode.deviceData
      if (!deviceData) {
        return qrCode.updateData((qrData) => qrData.changeUrl(qrValue.value))
      }

      let newDeviceData = deviceData
      for (let i = 0; i < deviceOsList.length && i < urlList.length; i++) {
        const deviceOsId = parseInt(deviceOsList[i], 10)
        const urlString = urlList[i]

        // deviceOsIdからDeviceとOsを逆引き
        const deviceOs = this.getDeviceOsFromId(deviceOsId)
        if (deviceOs) {
          // Url ValueObjectを作成
          const urlResult = Url.create(urlString, this.language)
          const url = urlResult.url || Url.empty(this.language)

          newDeviceData = newDeviceData.updateDeviceOsUrl(
            i,
            deviceOs.device,
            deviceOs.os,
            url
          )
        }
      }

      return qrCode.updateDeviceData(newDeviceData)
    } catch (error) {
      // URLのパースに失敗した場合はURLのみ保存
      return qrCode.updateData((qrData) => qrData.changeUrl(qrValue.value))
    }
  }

  /**
   * deviceOsIdからDeviceとOsを取得（逆引き）
   */
  private getDeviceOsFromId(
    deviceOsId: number
  ): { device: Device; os: Os } | null {
    // すべての組み合わせを試して逆引き
    const devices = [
      Device.all(this.language),
      Device.mobile(this.language),
      Device.tablet(this.language),
      Device.pc(this.language)
    ]

    const oss = [
      Os.windows(this.language),
      Os.macintosh(this.language),
      Os.ios(this.language),
      Os.android(this.language),
      Os.linux(this.language),
      Os.other(this.language)
    ]

    for (const device of devices) {
      for (const os of oss) {
        if (DeviceOsService.getDeviceOs(device, os) === deviceOsId) {
          return { device, os }
        }
      }
    }

    return null
  }

  /**
   * vCard QRコードをパース
   * TODO: QrCodeDataに適切なメソッドを追加してから実装
   */
  private parseVCardQr(qrValue: QrValue): QrCode {
    // 現時点では**vCardパースをスキップ**してテキストとして扱う
    const qrCode = QrCode.createContact(this.language)
    return qrCode.updateData((qrData) => qrData.changeText(qrValue.value))
  }
}
