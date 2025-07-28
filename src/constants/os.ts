import { DEVICES } from './device'

export const OS = {
  notSet: 0,
  windows: 1,
  macintosh: 2,
  ios: 3,
  android: 4,
  linux: 5,
  other: 6
} as const

export const os = Object.values(OS)

export const isOSNotSet = (value: number) => value === OS.notSet
export const isOSWindows = (value: number) => value === OS.windows
export const isOSMacintosh = (value: number) => value === OS.macintosh
export const isOSIos = (value: number) => value === OS.ios
export const isOSMacintoshOrIos = (value: number) => isOSMacintosh(value) || isOSIos(value)
export const isOSAndroid = (value: number) => value === OS.android
export const isOSLinux = (value: number) => value === OS.linux
export const isOSOther = (value: number) => value === OS.other

export function detectOS() {
  const userAgent = navigator.userAgent

  if (/Windows/i.test(userAgent)) {
    return OS.windows
  } else if (/Macintosh/i.test(userAgent)) {
    return OS.macintosh
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return OS.ios
  } else if (/Android/i.test(userAgent)) {
    return OS.android
  } else if (/Linux/i.test(userAgent)) {
    return OS.linux
  }
  return OS.other
}

export const getOsName = (value: number) => {
  const entry = Object.entries(OS).find(([key, val]) => val === value)
  return entry ? entry[0] : ''
} 