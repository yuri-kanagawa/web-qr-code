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
