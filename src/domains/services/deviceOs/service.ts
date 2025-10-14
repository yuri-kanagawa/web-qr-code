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
}
