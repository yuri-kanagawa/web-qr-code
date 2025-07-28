import {
  isOSLinux,
  isOSMacintosh,
  isOSIos,
  isOSOther,
  isOSWindows,
  isOSAndroid,
  OS
} from './os'
import { DEVICES, isDeviceAll, isDevicePc, isDeviceMobile, isDeviceTablet } from './device'

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
  if (isDeviceAll(device)) {
    if (isOSWindows(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndAll
      }
    }
    if (isOSMacintosh(os)) {
      return {
        deviceOs: DEVICES_OS.macintoshAndAll
      }
    }
    if (isOSIos(os)) {
      return {
        deviceOs: DEVICES_OS.iosAndAll
      }
    }
    if (isOSAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.androidAndAll
      }
    }
    if (isOSLinux(os)) {
      return {
        deviceOs: DEVICES_OS.linuxAndAll
      }
    }
    if (isOSOther(os)) {
      return {
        deviceOs: DEVICES_OS.otherAndAll
      }
    }
  }

  if (isDeviceMobile(device)) {
    if (isOSWindows(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndMobile
      }
    }
    if (isOSMacintosh(os)) {
      return {
        deviceOs: DEVICES_OS.macintoshAndMobile
      }
    }
    if (isOSIos(os)) {
      return {
        deviceOs: DEVICES_OS.iosAndMobile
      }
    }
    if (isOSAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.androidAndMobile
      }
    }
    if (isOSLinux(os)) {
      return {
        deviceOs: DEVICES_OS.linuxAndMobile
      }
    }
    if (isOSOther(os)) {
      return {
        deviceOs: DEVICES_OS.otherAndMobile
      }
    }
  }

  if (isDeviceTablet(device)) {
    if (isOSWindows(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndTablet
      }
    }
    if (isOSMacintosh(os)) {
      return {
        deviceOs: DEVICES_OS.macintoshAndTablet
      }
    }
    if (isOSIos(os)) {
      return {
        deviceOs: DEVICES_OS.iosAndTablet
      }
    }
    if (isOSAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.androidAndTablet
      }
    }
    if (isOSLinux(os)) {
      return {
        deviceOs: DEVICES_OS.linuxAndTable
      }
    }
    if (isOSOther(os)) {
      return {
        deviceOs: DEVICES_OS.otherAndTablet
      }
    }
  }

  if (isDevicePc(device)) {
    if (isOSWindows(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndPc
      }
    }
    if (isOSMacintosh(os)) {
      return {
        deviceOs: DEVICES_OS.macintoshAndPc
      }
    }
    if (isOSIos(os)) {
      return {
        deviceOs: DEVICES_OS.iosAndPc
      }
    }
    if (isOSAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.androidAndPc
      }
    }
    if (isOSLinux(os)) {
      return {
        deviceOs: DEVICES_OS.linuxAndPc
      }
    }
    if (isOSOther(os)) {
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