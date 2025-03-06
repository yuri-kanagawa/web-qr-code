export const OS = {
  notSet: 0, //NotSet
  windowsAndroid: 1,
  macintoshIos: 2,
  linux: 3,
  other: 4
} as const

export const isWindowsOrAndroid = (value: number) => value === OS.notSet

export const isMacintoshOrIos = (value: number) => value === OS.macintoshIos

export const isLinux = (value: number) => value === OS.linux

export const isOther = (value: number) => value === OS.other

export const getOsKeyLabelPairs = () => Object.values(OS)
export function detectOS() {
  const userAgent = navigator.userAgent.toLowerCase()

  if (/windows nt/i.test(userAgent)) {
    return OS.windowsAndroid
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    return OS.macintoshIos
  } else if (/android/i.test(userAgent)) {
    return OS.windowsAndroid
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    return OS.macintoshIos
  } else if (/linux/i.test(userAgent)) {
    return OS.linux
  } else {
    return OS.other
  }
}
