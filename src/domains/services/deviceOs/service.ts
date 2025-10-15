import { Device } from '@/domains/valueObjects/device'
import { Os } from '@/domains/valueObjects/os'

export class DeviceOsService {
  static readonly COMBINATIONS = {
    NOT_SET: 0,
    WINDOWS_AND_ALL: 1,
    WINDOWS_AND_MOBILE: 2,
    WINDOWS_AND_TABLET: 3,
    WINDOWS_AND_PC: 4,
    MACINTOSH_AND_ALL: 5,
    MACINTOSH_AND_MOBILE: 6,
    MACINTOSH_AND_TABLET: 7,
    MACINTOSH_AND_PC: 8,
    IOS_AND_ALL: 9,
    IOS_AND_MOBILE: 10,
    IOS_AND_TABLET: 11,
    IOS_AND_PC: 12,
    ANDROID_AND_ALL: 13,
    ANDROID_AND_MOBILE: 14,
    ANDROID_AND_TABLET: 15,
    ANDROID_AND_PC: 16,
    LINUX_AND_ALL: 17,
    LINUX_AND_MOBILE: 18,
    LINUX_AND_TABLET: 19,
    LINUX_AND_PC: 20,
    OTHER_AND_ALL: 21,
    OTHER_AND_MOBILE: 22,
    OTHER_AND_TABLET: 23,
    OTHER_AND_PC: 24
  } as const

  static getDeviceOs(device: Device, os: Os): number {
    // All Device
    if (device.isAll) {
      if (os.isWindows) return DeviceOsService.COMBINATIONS.WINDOWS_AND_ALL
      if (os.isMacintosh) return DeviceOsService.COMBINATIONS.MACINTOSH_AND_ALL
      if (os.isIos) return DeviceOsService.COMBINATIONS.IOS_AND_ALL
      if (os.isAndroid) return DeviceOsService.COMBINATIONS.ANDROID_AND_ALL
      if (os.isLinux) return DeviceOsService.COMBINATIONS.LINUX_AND_ALL
      if (os.isOther) return DeviceOsService.COMBINATIONS.OTHER_AND_ALL
    }

    // Mobile Device
    if (device.isMobile) {
      if (os.isWindows) return DeviceOsService.COMBINATIONS.WINDOWS_AND_MOBILE
      if (os.isMacintosh)
        return DeviceOsService.COMBINATIONS.MACINTOSH_AND_MOBILE
      if (os.isIos) return DeviceOsService.COMBINATIONS.IOS_AND_MOBILE
      if (os.isAndroid) return DeviceOsService.COMBINATIONS.ANDROID_AND_MOBILE
      if (os.isLinux) return DeviceOsService.COMBINATIONS.LINUX_AND_MOBILE
      if (os.isOther) return DeviceOsService.COMBINATIONS.OTHER_AND_MOBILE
    }

    // Tablet Device
    if (device.isTablet) {
      if (os.isWindows) return DeviceOsService.COMBINATIONS.WINDOWS_AND_TABLET
      if (os.isMacintosh)
        return DeviceOsService.COMBINATIONS.MACINTOSH_AND_TABLET
      if (os.isIos) return DeviceOsService.COMBINATIONS.IOS_AND_TABLET
      if (os.isAndroid) return DeviceOsService.COMBINATIONS.ANDROID_AND_TABLET
      if (os.isLinux) return DeviceOsService.COMBINATIONS.LINUX_AND_TABLET
      if (os.isOther) return DeviceOsService.COMBINATIONS.OTHER_AND_TABLET
    }

    // PC Device
    if (device.isPc) {
      if (os.isWindows) return DeviceOsService.COMBINATIONS.WINDOWS_AND_PC
      if (os.isMacintosh) return DeviceOsService.COMBINATIONS.MACINTOSH_AND_PC
      if (os.isIos) return DeviceOsService.COMBINATIONS.IOS_AND_PC
      if (os.isAndroid) return DeviceOsService.COMBINATIONS.ANDROID_AND_PC
      if (os.isLinux) return DeviceOsService.COMBINATIONS.LINUX_AND_PC
      if (os.isOther) return DeviceOsService.COMBINATIONS.OTHER_AND_PC
    }

    return DeviceOsService.COMBINATIONS.NOT_SET
  }

  /**
   * QRコードのdeviceOs配列から、現在のデバイス・OSにマッチするインデックスを探す
   * Device=Allの場合は、OSのみが一致すればマッチする
   * @param deviceOsList QRコードに含まれるdeviceOs組み合わせIDの配列
   * @param currentDevice 現在のデバイス
   * @param currentOs 現在のOS
   * @returns マッチするインデックス（-1の場合はマッチなし）
   */
  static findMatchingIndex(
    deviceOsList: number[],
    currentDevice: Device,
    currentOs: Os
  ): number {
    if (!deviceOsList || deviceOsList.length === 0) {
      return -1
    }

    // 現在のデバイス・OSの完全一致の組み合わせIDを取得
    const currentDeviceOsId = DeviceOsService.getDeviceOs(
      currentDevice,
      currentOs
    )

    // 完全一致を優先的に探す
    const exactMatchIndex = deviceOsList.indexOf(currentDeviceOsId)
    if (exactMatchIndex !== -1) {
      return exactMatchIndex
    }

    // Device=Allの場合のマッチング
    // QRコードのdeviceOs配列を走査して、OSが一致するものを探す
    for (let i = 0; i < deviceOsList.length; i++) {
      const deviceOsId = deviceOsList[i]

      // Device=All の組み合わせIDとOSのマッピング
      const allDeviceMapping: { [key: number]: boolean } = {
        [DeviceOsService.COMBINATIONS.WINDOWS_AND_ALL]: currentOs.isWindows,
        [DeviceOsService.COMBINATIONS.MACINTOSH_AND_ALL]: currentOs.isMacintosh,
        [DeviceOsService.COMBINATIONS.IOS_AND_ALL]: currentOs.isIos,
        [DeviceOsService.COMBINATIONS.ANDROID_AND_ALL]: currentOs.isAndroid,
        [DeviceOsService.COMBINATIONS.LINUX_AND_ALL]: currentOs.isLinux,
        [DeviceOsService.COMBINATIONS.OTHER_AND_ALL]: currentOs.isOther
      }

      if (allDeviceMapping[deviceOsId]) {
        return i
      }
    }

    return -1
  }
}
