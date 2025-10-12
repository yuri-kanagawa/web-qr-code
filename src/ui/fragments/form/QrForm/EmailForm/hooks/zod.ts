import { z } from 'zod'
import { getLocale } from '@/locales/config/languages'

const language = z.string()

// メールアドレスのバリデーション
const email = z.string()

// 件名のバリデーション
const subject = z.string()

// 本文のバリデーション
const body = z.string()

export const registerQrCodeEmailSchema = z.object({
  email,
  subject,
  body,
  language
}).refine((data) => {
  const locale = getLocale(data.language)
  const { message } = locale
  
  // メールアドレスのバリデーション
  if (!data.email) {
    return false
  }
  
  // 簡単なメール形式チェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return false
  }
  
  return true
}, (data) => {
  const locale = getLocale(data.language)
  const { message } = locale
  
  if (!data.email) {
    return {
      message: message.validation.email.required,
      path: ['email']
    }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return {
      message: message.validation.email.invalid,
      path: ['email']
    }
  }
  
  return {
    message: '',
    path: []
  }
})

export type RegisterQrCodeEmailSchema = z.infer<typeof registerQrCodeEmailSchema>
