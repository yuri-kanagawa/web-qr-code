import {
  isLinux,
  isMacintoshOrIos,
  isOther,
  isWindows,
  isAndroid,
  OS
} from '@/domain/os'
import { DEVICES, isAll, isDesktop, isMobile, isTablet } from '@/domain/device'

export const DEVICES_OS = {
  notSet: 0,
  windowsAndAll: 1,
  windowsAndMobile: 2,
  windowsAndTablet: 3,
  windowsAndDesktop: 4,
  androidAndAll: 5,
  androidAndMobile: 6,
  androidAndTablet: 7,
  androidAndDesktop: 8,
  macintoshIosAndAll: 9,
  macintoshIosAndMobile: 10,
  macintoshIosAndTablet: 11,
  macintoshIosAndDesktop: 12,
  linuxAndAll: 13,
  linuxAndMobile: 14,
  linuxAndTable: 15,
  linuxAndDesktop: 16,
  otherAndAll: 17,
  otherAndMobile: 18,
  otherAndTablet: 19,
  otherAndDesktop: 20
} as const

const isWindowsAndAll = (value: number) => value === DEVICES_OS.windowsAndAll

const isWindowsAndMobile = (value: number) =>
  value === DEVICES_OS.windowsAndMobile

const isWindowsAndTablet = (value: number) =>
  value === DEVICES_OS.windowsAndTablet

const isWindowsAndDesktop = (value: number) =>
  value === DEVICES_OS.windowsAndDesktop

const isAndroidAndAll = (value: number) => value === DEVICES_OS.androidAndAll

const isAndroidAndMobile = (value: number) =>
  value === DEVICES_OS.androidAndMobile

const isAndroidAndTablet = (value: number) =>
  value === DEVICES_OS.androidAndTablet

const isAndroidAndDesktop = (value: number) =>
  value === DEVICES_OS.androidAndDesktop

const isMacintoshIosAndAll = (value: number) =>
  value === DEVICES_OS.macintoshIosAndAll

const isMacintoshIosAndMobile = (value: number) =>
  value === DEVICES_OS.macintoshIosAndMobile

const isMacintoshIosAndTablet = (value: number) =>
  value === DEVICES_OS.macintoshIosAndTablet

const isMacintoshIosAndDesktop = (value: number) =>
  value === DEVICES_OS.macintoshIosAndDesktop

const isLinuxAndAll = (value: number) => value === DEVICES_OS.linuxAndAll

const isLinuxAndMobile = (value: number) => value === DEVICES_OS.linuxAndMobile

const isLinuxAndTablet = (value: number) => value === DEVICES_OS.linuxAndTable

const isLinuxAndDesktop = (value: number) =>
  value === DEVICES_OS.linuxAndDesktop

const isOtherAndAll = (value: number) => value === DEVICES_OS.otherAndAll

const isOtherAndMobile = (value: number) => value === DEVICES_OS.otherAndMobile

const isOtherAndTablet = (value: number) => value === DEVICES_OS.otherAndTablet

const isOtherAndDesktop = (value: number) =>
  value === DEVICES_OS.otherAndDesktop

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
    if (isAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.androidAndAll
      }
    }
    if (isMacintoshOrIos(os)) {
      return {
        deviceOs: DEVICES_OS.macintoshIosAndAll
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
    if (isAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.androidAndMobile
      }
    }
    if (isMacintoshOrIos(os)) {
      return {
        deviceOs: DEVICES_OS.macintoshIosAndMobile
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
    if (isAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.androidAndTablet
      }
    }
    if (isMacintoshOrIos(os)) {
      return {
        deviceOs: DEVICES_OS.macintoshIosAndTablet
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

  if (isDesktop(device)) {
    if (isWindows(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndDesktop
      }
    }
    if (isAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.androidAndDesktop
      }
    }
    if (isMacintoshOrIos(os)) {
      return {
        deviceOs: DEVICES_OS.macintoshIosAndDesktop
      }
    }
    if (isLinux(os)) {
      return {
        deviceOs: DEVICES_OS.linuxAndDesktop
      }
    }
    if (isOther(os)) {
      return {
        deviceOs: DEVICES_OS.otherAndDesktop
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
  if (isWindowsAndDesktop(deviceOs)) {
    return {
      os: OS.windows,
      device: DEVICES.desktop
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
  if (isAndroidAndDesktop(deviceOs)) {
    return {
      os: OS.android,
      device: DEVICES.desktop
    }
  }

  if (isMacintoshIosAndAll(deviceOs)) {
    return {
      os: OS['macintosh/ios'],
      device: DEVICES.all
    }
  }
  if (isMacintoshIosAndMobile(deviceOs)) {
    return {
      os: OS['macintosh/ios'],
      device: DEVICES.mobile
    }
  }
  if (isMacintoshIosAndTablet(deviceOs)) {
    return {
      os: OS['macintosh/ios'],
      device: DEVICES.tablet
    }
  }
  if (isMacintoshIosAndDesktop(deviceOs)) {
    return {
      os: OS['macintosh/ios'],
      device: DEVICES.desktop
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
  if (isLinuxAndDesktop(deviceOs)) {
    return {
      os: OS.linux,
      device: DEVICES.desktop
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
  if (isOtherAndDesktop(deviceOs)) {
    return {
      os: OS.other,
      device: DEVICES.desktop
    }
  }

  return {
    os: OS.notSet,
    device: DEVICES.notSet
  }
}
