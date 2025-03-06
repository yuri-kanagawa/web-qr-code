import {
  isLinux,
  isMacintoshOrIos,
  isOther,
  isWindowsOrAndroid,
  OS
} from '@/domain/os'
import { DEVICES, isAll, isDesktop, isMobile, isTablet } from '@/domain/device'

export const DEVICES_OS = {
  notSet: 0,
  windowsAndroidAndAll: 1,
  windowsAndroidAndMobile: 2,
  windowsAndroidAndTablet: 3,
  windowsAndroidAndDesktop: 4,
  macintoshIosAndAll: 5,
  macintoshIosAndMobile: 6,
  macintoshIosAndTablet: 7,
  macintoshIosAndDesktop: 8,
  linuxAndAll: 9,
  linuxAndMobile: 10,
  linuxAndTable: 11,
  linuxAndDesktop: 12,
  otherAndAll: 13,
  otherAndMobile: 14,
  otherAndTablet: 15,
  otherAndDesktop: 16
} as const

const isWindowsAndroidAndAll = (value: number) =>
  value === DEVICES_OS.windowsAndroidAndAll

const isWindowsAndroidAndMobile = (value: number) =>
  value === DEVICES_OS.windowsAndroidAndMobile
const isWindowsAndroidAndTablet = (value: number) =>
  value === DEVICES_OS.windowsAndroidAndTablet
const isWindowsAndroidAndDesktop = (value: number) =>
  value === DEVICES_OS.windowsAndroidAndDesktop
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
    if (isWindowsOrAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndroidAndAll
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
    if (isWindowsOrAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndroidAndMobile
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
    if (isWindowsOrAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndroidAndTablet
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
    if (isWindowsOrAndroid(os)) {
      return {
        deviceOs: DEVICES_OS.windowsAndroidAndDesktop
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
  if (isWindowsAndroidAndAll(deviceOs)) {
    return {
      os: OS.windowsAndroid,
      device: DEVICES.all
    }
  }
  if (isWindowsAndroidAndMobile(deviceOs)) {
    return {
      os: OS.macintoshIos,
      device: DEVICES.mobile
    }
  }
  if (isWindowsAndroidAndTablet(deviceOs)) {
    return {
      os: OS.windowsAndroid,
      device: DEVICES.tablet
    }
  }

  if (isWindowsAndroidAndDesktop(deviceOs)) {
    return {
      os: OS.windowsAndroid,
      device: DEVICES.desktop
    }
  }

  if (isMacintoshIosAndAll(deviceOs)) {
    return {
      os: OS.macintoshIos,
      device: DEVICES.all
    }
  }

  if (isMacintoshIosAndMobile(deviceOs)) {
    return {
      os: OS.macintoshIos,
      device: DEVICES.mobile
    }
  }

  if (isMacintoshIosAndTablet(deviceOs)) {
    return {
      os: OS.macintoshIos,
      device: DEVICES.tablet
    }
  }

  if (isMacintoshIosAndDesktop(deviceOs)) {
    return {
      os: OS.macintoshIos,
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
