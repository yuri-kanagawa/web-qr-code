import { DEVICES } from '@/domain/device'

export const OS = {
  notSet: 0, //NotSet
  'windows/Android': 1,
  'macintosh/ios': 2,
  linux: 3,
  other: 4
} as const

export const osList = Object.values(OS)
export const getOsName = (value: number): string => {
  const entry = Object.entries(OS).find(([key, val]) => val === value)
  return entry ? entry[0] : ''
}

export const isWindowsOrAndroid = (value: number) =>
  value === OS['windows/Android']

export const isMacintoshOrIos = (value: number) => value === OS['macintosh/ios']

export const isLinux = (value: number) => value === OS.linux

export const isOther = (value: number) => value === OS.other
export function detectOS() {
  const userAgent = navigator.userAgent.toLowerCase()

  if (/windows nt/i.test(userAgent)) {
    return OS['windows/Android']
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    return OS['macintosh/ios']
  } else if (/android/i.test(userAgent)) {
    return OS['windows/Android']
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    return OS['macintosh/ios']
  } else if (/linux/i.test(userAgent)) {
    return OS.linux
  } else {
    return OS.other
  }
}
