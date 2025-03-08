export const DEVICES = {
  notSet: 0,
  all: 1,
  mobile: 2,
  tablet: 3,
  desktop: 4
} as const

export const devices = () => Object.values(DEVICES)

export const isNotSet = (value: number) => value === DEVICES.notSet
export const isAll = (value: number) => value === DEVICES.all
export const isMobile = (value: number) => value === DEVICES.mobile
export const isTablet = (value: number) => value === DEVICES.tablet
export const isDesktop = (value: number) => value === DEVICES.desktop
// 端末判定
export function detectDevice() {
  const userAgent = navigator.userAgent.toLowerCase()

  if (/android/i.test(userAgent)) {
    // Android端末
    return DEVICES.mobile
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    // iOS端末（iPhone, iPad, iPod）
    return DEVICES.mobile
  } else if (/windows phone/i.test(userAgent)) {
    // Windows Phone端末
    return DEVICES.mobile
  } else if (/tablet/i.test(userAgent)) {
    // タブレット端末（いくつかのAndroidタブレットに対応）
    return DEVICES.tablet
  } else if (/desktop/i.test(userAgent) || !/mobile|tablet/i.test(userAgent)) {
    // デスクトップ端末
    return DEVICES.desktop
  }
  return DEVICES.desktop
}
