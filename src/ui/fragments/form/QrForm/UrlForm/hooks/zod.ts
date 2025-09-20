import { z } from 'zod'
import { getLocale } from '@/locales/language'

const language = z.string()

// URL のバリデーションルール
const url = z.string()

export const registerQrCodeUrlSchema = z.object({
  url,
  language
}).refine((data) => {
  const locale = getLocale(data.language)
  const { message } = locale
  
  // URLのバリデーション
  if (!data.url) {
    return false
  }
  
  // 簡単なURL形式チェック
  try {
    new URL(data.url)
    return true
  } catch {
    return false
  }
}, (data) => {
  const locale = getLocale(data.language)
  const { message } = locale
  
  if (!data.url) {
    return {
      message: message.validation.url.required,
      path: ['url']
    }
  }
  
  try {
    new URL(data.url)
    return {
      message: '',
      path: []
    }
  } catch {
    return {
      message: message.validation.url.invalid,
      path: ['url']
    }
  }
})

export type RegisterQrCodeUrlSchema = z.infer<typeof registerQrCodeUrlSchema>
