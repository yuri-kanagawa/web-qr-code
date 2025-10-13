import { Email } from '@/domains/valueObjects/email'
import { Language } from '@/domains/valueObjects/language'
import { getLocale } from '@/locales/config/languages'
import { z } from 'zod'

const language = z.string()

// メールアドレスのバリデーション
const email = z.string()

// 件名のバリデーション
const subject = z.string()

// 本文のバリデーション
const body = z.string()

export const registerQrCodeEmailSchema = z
  .object({
    email,
    subject,
    body,
    language
  })
  .refine(
    (data) => {
      // メールアドレスが空の場合はスキップ
      if (!data.email) {
        return true
      }

      // Language valueObjectを使ってバリデーション
      const languageResult = Language.create(data.language)
      if (!languageResult.isSuccess || !languageResult.language) {
        return false
      }

      const emailResult = Email.create(data.email, languageResult.language)
      return emailResult.isSuccess
    },
    (data) => {
      const locale = getLocale(data.language)
      const { message } = locale

      // Email.create()を使ってエラーメッセージを取得
      const languageResult = Language.create(data.language)
      if (languageResult.isSuccess && languageResult.language) {
        const emailResult = Email.create(data.email, languageResult.language)
        if (!emailResult.isSuccess && emailResult.error) {
          return {
            message: emailResult.error.message,
            path: ['email']
          }
        }
      }

      return {
        message: message.validation.email.invalid,
        path: ['email']
      }
    }
  )

export type RegisterQrCodeEmailSchema = z.infer<
  typeof registerQrCodeEmailSchema
>
