import { en } from './en'
import { ja } from './ja'

export type Locale = typeof en

export const language = {
  en: 'English',
  ja: '日本語',
  fr: 'Français'
} as const

export type LanguageKey = keyof typeof language

export const isLanguage = (target: string): boolean => {
  return Object.keys(language).includes(target)
}
export const isEn = (key: string): boolean => key === 'en'
export const isJa = (key: string): boolean => key === 'ja'


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