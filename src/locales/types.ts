import { en } from './en'

// メインのLocale型
export type Locale = typeof en

// メタデータの型
export type Meta = {
  title: string
  description: string
  keywords?: string[]
  openGraph?: {
    title?: string
    description?: string
    images?: string[]
  }
}

// 単語の型（必要に応じて拡張）
export type Word = typeof en.word

// メッセージの型（必要に応じて拡張）
export type Message = typeof en.message
