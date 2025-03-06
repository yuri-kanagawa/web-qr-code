export const DEVICES = {
  notSet: 0,
  all: 1,
  mobile: 2,
  tablet: 3,
  desktop: 4
} as const

export const getDevices = () => Object.values(DEVICES)

export const isNotSet = (value: number) => value === DEVICES.notSet
export const isAll = (value: number) => value === DEVICES.all
export const isMobile = (value: number) => value === DEVICES.mobile
export const isTablet = (value: number) => value === DEVICES.tablet
export const isDesktop = (value: number) => value === DEVICES.desktop
