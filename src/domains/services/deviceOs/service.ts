import { Device } from '@/domains/valueObjects/device'
import { Os } from '@/domains/valueObjects/os'

export class DeviceOsService {
  static readonly COMBINATIONS = {
    NOT_SET: 0,
    WINDOWS_AND_ALL: 10,
    WINDOWS_AND_MOBILE: 20,
    WINDOWS_AND_TABLET: 30,
    WINDOWS_AND_PC: 40,
    MACINTOSH_AND_ALL: 50,
    MACINTOSH_AND_MOBILE: 60,
    MACINTOSH_AND_TABLET: 70,
    MACINTOSH_AND_PC: 80,
    IOS_AND_ALL: 90,
    IOS_AND_MOBILE: 100,
    IOS_AND_TABLET: 110,
    IOS_AND_PC: 120,
    ANDROID_AND_ALL: 130,
    ANDROID_AND_MOBILE: 140,
    ANDROID_AND_TABLET: 150,
    ANDROID_AND_PC: 160,
    LINUX_AND_ALL: 170,
    LINUX_AND_MOBILE: 180,
    LINUX_AND_TABLET: 190,
    LINUX_AND_PC: 200,
    OTHER_AND_ALL: 210,
    OTHER_AND_MOBILE: 220,
    OTHER_AND_TABLET: 230,
    OTHER_AND_PC: 240
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
   * 指定されたdeviceOsIdが現在のデバイス・OSにマッチするかを判定
   * Device=Allの場合は、OSのみが一致すればマッチする
   * @param deviceOsId QRコードに含まれるdeviceOs組み合わせID
   * @param currentDevice 現在のデバイス
   * @param currentOs 現在のOS
   * @returns マッチする場合はtrue
   */
  static isMatch(
    deviceOsId: number,
    currentDevice: Device,
    currentOs: Os
  ): boolean {
    // 現在のデバイス・OSの完全一致の組み合わせIDを取得
    const currentDeviceOsId = DeviceOsService.getDeviceOs(
      currentDevice,
      currentOs
    )

    // 完全一致
    if (deviceOsId === currentDeviceOsId) {
      return true
    }

    // Device=Allの場合のマッチング（OSのみが一致すればマッチ）
    const allDeviceMapping: { [key: number]: boolean } = {
      [DeviceOsService.COMBINATIONS.WINDOWS_AND_ALL]: currentOs.isWindows,
      [DeviceOsService.COMBINATIONS.MACINTOSH_AND_ALL]: currentOs.isMacintosh,
      [DeviceOsService.COMBINATIONS.IOS_AND_ALL]: currentOs.isIos,
      [DeviceOsService.COMBINATIONS.ANDROID_AND_ALL]: currentOs.isAndroid,
      [DeviceOsService.COMBINATIONS.LINUX_AND_ALL]: currentOs.isLinux,
      [DeviceOsService.COMBINATIONS.OTHER_AND_ALL]: currentOs.isOther
    }

    return allDeviceMapping[deviceOsId] === true
  }
}
