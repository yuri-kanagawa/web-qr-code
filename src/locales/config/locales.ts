import { en } from '../en'
import { ja } from '../ja'
import type { Locale } from './languages'

// ロケールマップ
export const locales: Record<string, Locale> = {
  en: en,
  ja: ja,
  fr: en // フランス語はまだ実装されていないので英語を返す
}
