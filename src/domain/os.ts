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
