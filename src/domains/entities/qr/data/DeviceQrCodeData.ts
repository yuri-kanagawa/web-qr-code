import { Device } from '@/domains/valueObjects/device'
import { Language } from '@/domains/valueObjects/language'
import { Os } from '@/domains/valueObjects/os'
import { Url } from '@/domains/valueObjects/url'

/**
 * Device QRコード用のデータ構造
 * 複数のデバイスとOSの組み合わせを管理
 */
export interface DeviceOsUrl {
  device: Device
  os: Os
  url: Url
}

export class DeviceQrCodeData {
  private constructor(
    private _deviceOsUrls: DeviceOsUrl[],
    private readonly _language: Language
  ) {}

  static default(language: Language = Language.default()): DeviceQrCodeData {
    const notSetDevice = Device.notSet(language)
    const notSetOs = Os.notSet(language)
    const emptyUrl = Url.empty(language)

    return new DeviceQrCodeData(
      [
        {
          device: notSetDevice,
          os: notSetOs,
          url: emptyUrl
        }
      ],
      language
    )
  }

  get deviceOsUrls(): DeviceOsUrl[] {
    return this._deviceOsUrls
  }

  get language(): Language {
    return this._language
  }

  /**
   * デバイスとOSの組み合わせを追加
   */
  addDeviceOsUrl(device: Device, os: Os, url: Url): DeviceQrCodeData {
    return new DeviceQrCodeData(
      [...this._deviceOsUrls, { device, os, url }],
      this._language
    )
  }

  /**
   * 指定されたインデックスのデバイスとOSの組み合わせを更新
   */
  updateDeviceOsUrl(
    index: number,
    device: Device,
    os: Os,
    url: Url
  ): DeviceQrCodeData {
    const newDeviceOsUrls = [...this._deviceOsUrls]
    newDeviceOsUrls[index] = { device, os, url }
    return new DeviceQrCodeData(newDeviceOsUrls, this._language)
  }

  /**
   * 指定されたインデックスのデバイスとOSの組み合わせを削除
   */
  removeDeviceOsUrl(index: number): DeviceQrCodeData {
    if (this._deviceOsUrls.length <= 1) {
      return this // 最低1つは残す
    }

    const newDeviceOsUrls = this._deviceOsUrls.filter((_, i) => i !== index)
    return new DeviceQrCodeData(newDeviceOsUrls, this._language)
  }

  /**
   * デバイスとOSの組み合わせの順序を変更
   */
  reorderDeviceOsUrls(fromIndex: number, toIndex: number): DeviceQrCodeData {
    const newDeviceOsUrls = [...this._deviceOsUrls]
    const [removed] = newDeviceOsUrls.splice(fromIndex, 1)
    newDeviceOsUrls.splice(toIndex, 0, removed)
    return new DeviceQrCodeData(newDeviceOsUrls, this._language)
  }

  /**
   * 有効なデバイスとOSの組み合わせのみを取得
   */
  getValidDeviceOsUrls(): DeviceOsUrl[] {
    const notSetDevice = Device.notSet(this._language)
    const notSetOs = Os.notSet(this._language)

    return this._deviceOsUrls.filter(
      ({ device, os, url }) =>
        !device.equals(notSetDevice) && !os.equals(notSetOs) && !url.isEmpty
    )
  }

  /**
   * フォーム用の値オブジェクトを取得
   */
  get value() {
    return {
      devices: this._deviceOsUrls.map(({ device, os, url }) => ({
        device: device.value,
        os: os.value,
        url: url.value
      }))
    }
  }
}
