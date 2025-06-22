import {
  isLinux,
  isMacintosh,
  isIos,
  isOther,
  isWindows,
  isAndroid,
  OS
} from '@/domain/os'
import { DEVICES, isAll, isPc, isMobile, isTablet } from '@/domain/device'

export const DEVICES_OS = {
  notSet: 0,
  windowsAndAll: 1,
  windowsAndMobile: 2,
  windowsAndTablet: 3,
  windowsAndPc: 4,
  macintoshAndAll: 5,
  macintoshAndMobile: 6,
  macintoshAndTablet: 7,
  macintoshAndPc: 8,
  iosAndAll: 9,
  iosAndMobile: 10,
  iosAndTablet: 11,
  iosAndPc: 12,
  androidAndAll: 13,
  androidAndMobile: 14,
  androidAndTablet: 15,
  androidAndPc: 16,
  linuxAndAll: 17,
  linuxAndMobile: 18,
  linuxAndTable: 19,
  linuxAndPc: 20,
  otherAndAll: 21,
  otherAndMobile: 22,
  otherAndTablet: 23,
  otherAndPc: 24
} as const

const isWindowsAndAll = (value: number) => value === DEVICES_OS.windowsAndAll

const isWindowsAndMobile = (value: number) =>
  value === DEVICES_OS.windowsAndMobile

const isWindowsAndTablet = (value: number) =>
  value === DEVICES_OS.windowsAndTablet

const isWindowsAndPc = (value: number) => value === DEVICES_OS.windowsAndPc

const isMacintoshAndAll = (value: number) =>
  value === DEVICES_OS.macintoshAndAll

const isMacintoshAndMobile = (value: number) =>
  value === DEVICES_OS.macintoshAndMobile

const isMacintoshAndTablet = (value: number) =>
  value === DEVICES_OS.macintoshAndTablet

const isMacintoshAndPc = (value: number) =>
  value === DEVICES_OS.macintoshAndPc

const isIosAndAll = (value: number) => value === DEVICES_OS.iosAndAll

const isIosAndMobile = (value: number) => value === DEVICES_OS.iosAndMobile

const isIosAndTablet = (value: number) => value === DEVICES_OS.iosAndTablet

const isIosAndPc = (value: number) => value === DEVICES_OS.iosAndPc

const isAndroidAndAll = (value: number) => value === DEVICES_OS.androidAndAll

const isAndroidAndMobile = (value: number) =>
  value === DEVICES_OS.androidAndMobile

const isAndroidAndTablet = (value: number) =>
  value === DEVICES_OS.androidAndTablet

const isAndroidAndPc = (value: number) => value === DEVICES_OS.androidAndPc

const isLinuxAndAll = (value: number) => value === DEVICES_OS.linuxAndAll

const isLinuxAndMobile = (value: number) => value === DEVICES_OS.linuxAndMobile

const isLinuxAndTablet = (value: number) => value === DEVICES_OS.linuxAndTable

const isLinuxAndPc = (value: number) => value === DEVICES_OS.linuxAndPc

const isOtherAndAll = (value: number) => value === DEVICES_OS.otherAndAll

const isOtherAndMobile = (value: number) => value === DEVICES_OS.otherAndMobile

const isOtherAndTablet = (value: number) => value === DEVICES_OS.otherAndTablet

const isOtherAndPc = (value: number) => value === DEVICES_OS.otherAndPc

type DeviceAndOsType = {
  os: (typeof OS)[keyof typeof OS]
  device: (typeof DEVICES)[keyof typeof DEVICES]
}

type DeviceOsType = {
  deviceOs: (typeof DEVICES_OS)[keyof typeof DEVICES_OS]
}

export const getDeviceOs = ({ device, os }: DeviceAndOsType): DeviceOsType => {
  if (isAll(device)) {
    if (isWindows(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndAll
      }
    }
    if (isMacintosh(os)) {
      return {
        deviceOs: DEVICES_OS.macintoshAndAll
      }
    }
    if (isIos(os)) {
      return {
        deviceOs: DEVICES_OS.iosAndAll
      }
    }
    if (isAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.androidAndAll
      }
    }
    if (isLinux(os)) {
      return {
        deviceOs: DEVICES_OS.linuxAndAll
      }
    }
    if (isOther(os)) {
      return {
        deviceOs: DEVICES_OS.otherAndAll
      }
    }
  }

  if (isMobile(device)) {
    if (isWindows(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndMobile
      }
    }
    if (isMacintosh(os)) {
      return {
        deviceOs: DEVICES_OS.macintoshAndMobile
      }
    }
    if (isIos(os)) {
      return {
        deviceOs: DEVICES_OS.iosAndMobile
      }
    }
    if (isAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.androidAndMobile
      }
    }
    if (isLinux(os)) {
      return {
        deviceOs: DEVICES_OS.linuxAndMobile
      }
    }
    if (isOther(os)) {
      return {
        deviceOs: DEVICES_OS.otherAndMobile
      }
    }
  }

  if (isTablet(device)) {
    if (isWindows(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndTablet
      }
    }
    if (isMacintosh(os)) {
      return {
        deviceOs: DEVICES_OS.macintoshAndTablet
      }
    }
    if (isIos(os)) {
      return {
        deviceOs: DEVICES_OS.iosAndTablet
      }
    }
    if (isAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.androidAndTablet
      }
    }
    if (isLinux(os)) {
      return {
        deviceOs: DEVICES_OS.linuxAndTable
      }
    }
    if (isOther(os)) {
      return {
        deviceOs: DEVICES_OS.otherAndTablet
      }
    }
  }

  if (isPc(device)) {
    if (isWindows(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndPc
      }
    }
    if (isMacintosh(os)) {
      return {
        deviceOs: DEVICES_OS.macintoshAndPc
      }
    }
    if (isIos(os)) {
      return {
        deviceOs: DEVICES_OS.iosAndPc
      }
    }
    if (isAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.androidAndPc
      }
    }
    if (isLinux(os)) {
      return {
        deviceOs: DEVICES_OS.linuxAndPc
      }
    }
    if (isOther(os)) {
      return {
        deviceOs: DEVICES_OS.otherAndPc
      }
    }
  }

  return {
    deviceOs: DEVICES_OS.notSet
  }
}

export const getDeviceAndOs = ({ deviceOs }: DeviceOsType): DeviceAndOsType => {
  if (isWindowsAndAll(deviceOs)) {
    return {
      os: OS.windows,
      device: DEVICES.all
    }
  }
  if (isWindowsAndMobile(deviceOs)) {
    return {
      os: OS.windows,
      device: DEVICES.mobile
    }
  }
  if (isWindowsAndTablet(deviceOs)) {
    return {
      os: OS.windows,
      device: DEVICES.tablet
    }
  }
  if (isWindowsAndPc(deviceOs)) {
    return {
      os: OS.windows,
      device: DEVICES.pc
    }
  }

  if (isMacintoshAndAll(deviceOs)) {
    return {
      os: OS.macintosh,
      device: DEVICES.all
    }
  }
  if (isMacintoshAndMobile(deviceOs)) {
    return {
      os: OS.macintosh,
      device: DEVICES.mobile
    }
  }
  if (isMacintoshAndTablet(deviceOs)) {
    return {
      os: OS.macintosh,
      device: DEVICES.tablet
    }
  }
  if (isMacintoshAndPc(deviceOs)) {
    return {
      os: OS.macintosh,
      device: DEVICES.pc
    }
  }

  if (isIosAndAll(deviceOs)) {
    return {
      os: OS.ios,
      device: DEVICES.all
    }
  }
  if (isIosAndMobile(deviceOs)) {
    return {
      os: OS.ios,
      device: DEVICES.mobile
    }
  }
  if (isIosAndTablet(deviceOs)) {
    return {
      os: OS.ios,
      device: DEVICES.tablet
    }
  }
  if (isIosAndPc(deviceOs)) {
    return {
      os: OS.ios,
      device: DEVICES.pc
    }
  }

  if (isAndroidAndAll(deviceOs)) {
    return {
      os: OS.android,
      device: DEVICES.all
    }
  }
  if (isAndroidAndMobile(deviceOs)) {
    return {
      os: OS.android,
      device: DEVICES.mobile
    }
  }
  if (isAndroidAndTablet(deviceOs)) {
    return {
      os: OS.android,
      device: DEVICES.tablet
    }
  }
  if (isAndroidAndPc(deviceOs)) {
    return {
      os: OS.android,
      device: DEVICES.pc
    }
  }

  if (isLinuxAndAll(deviceOs)) {
    return {
      os: OS.linux,
      device: DEVICES.all
    }
  }
  if (isLinuxAndMobile(deviceOs)) {
    return {
      os: OS.linux,
      device: DEVICES.mobile
    }
  }
  if (isLinuxAndTablet(deviceOs)) {
    return {
      os: OS.linux,
      device: DEVICES.tablet
    }
  }
  if (isLinuxAndPc(deviceOs)) {
    return {
      os: OS.linux,
      device: DEVICES.pc
    }
  }

  if (isOtherAndAll(deviceOs)) {
    return {
      os: OS.other,
      device: DEVICES.all
    }
  }
  if (isOtherAndMobile(deviceOs)) {
    return {
      os: OS.other,
      device: DEVICES.mobile
    }
  }
  if (isOtherAndTablet(deviceOs)) {
    return {
      os: OS.other,
      device: DEVICES.tablet
    }
  }
  if (isOtherAndPc(deviceOs)) {
    return {
      os: OS.other,
      device: DEVICES.pc
    }
  }

  return {
    os: OS.notSet,
    device: DEVICES.notSet
  }
}
