import type { Locale } from './languages'

// ロケールマップを動的に生成
export const locales: Record<string, Locale> = {
  get en() {
    return require('../en').en
  },
  get ja() {
    return require('../ja').ja
  },
  get fr() {
    return require('../en').en // フランス語はまだ実装されていないので英語を返す
  }
}
