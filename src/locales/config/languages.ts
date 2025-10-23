import { en } from '../en'
import { ja } from '../ja'

export type Locale = typeof en

export const languages = {
  en: 'English',
  ja: '日本語',
  fr: 'Français'
} as const

export type LanguageKey = keyof typeof languages
