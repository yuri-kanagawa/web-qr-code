export function detectOS() {
  const userAgent = navigator.userAgent.toLowerCase()

  if (/windows nt/i.test(userAgent)) {
    return 'windows'
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    return 'macos'
  } else if (/android/i.test(userAgent)) {
    return 'android'
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    return 'ios'
  } else if (/linux/i.test(userAgent)) {
    return 'linux'
  } else {
    return 'other'
  }
}

// 端末判定
export function detectDevice() {
  const userAgent = navigator.userAgent.toLowerCase()

  if (/android/i.test(userAgent)) {
    // Android端末
    return 'mobile'
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    // iOS端末（iPhone, iPad, iPod）
    return 'mobile'
  } else if (/windows phone/i.test(userAgent)) {
    // Windows Phone端末
    return 'mobile'
  } else if (/tablet/i.test(userAgent)) {
    // タブレット端末（いくつかのAndroidタブレットに対応）
    return 'tablet'
  } else if (/desktop/i.test(userAgent) || !/mobile|tablet/i.test(userAgent)) {
    // デスクトップ端末
    return 'desktop'
  }

  // デフォルト
  return 'desktop'
}
