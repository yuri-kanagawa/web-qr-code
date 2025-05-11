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
const languageToCountryMap: Record<string, string> = {
  ja: 'jp',
  en: 'us',
  fr: 'fr',
  de: 'de'
  // 必要に応じて他のマッピングを追加
}
export const getCountryCode = () => {
  const locale =
    Intl.DateTimeFormat().resolvedOptions().locale || navigator.language
  const countryCode = locale.includes('-')
    ? locale.split('-')[1]?.toLowerCase()
    : locale.toLowerCase()

  // 言語コードを国コードに変換
  const mappedCountryCode = languageToCountryMap[countryCode] || countryCode

  // 国コードでも言語コードでもない場合は 'us' を返す
  return /^[a-z]{2}$/.test(mappedCountryCode) ? mappedCountryCode : 'us'
}
