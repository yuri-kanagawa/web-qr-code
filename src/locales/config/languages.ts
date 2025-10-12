import { en } from '../en'
import { ja } from '../ja'

export type Locale = typeof en

export const languages = {
  en: 'English',
  ja: '日本語',
  fr: 'Français'
} as const

export type LanguageKey = keyof typeof languages

// ロケールマップ
export const locales: Record<LanguageKey, Locale> = {
  en: en,
  ja: ja,
  fr: en // フランス語はまだ実装されていないので英語を返す
}

export const isLanguage = (target: string): boolean => {
  return Object.keys(languages).includes(target)
}
export const getLocale = (lang: string): Locale => {
  switch (lang) {
    case 'en':
      return en
    case 'ja':
      return ja
    case 'fr':
      return en // フランス語はまだ実装されていないので英語を返す
    default:
      return en
  }
}
