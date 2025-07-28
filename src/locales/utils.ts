import { z } from 'zod'
import { getLocale, LanguageKey } from './language'

// 多言語対応のzodスキーマを作成するためのユーティリティ関数
export const createLocalizedSchema = (language: LanguageKey) => {
  const locale = getLocale(language)
  const { message } = locale

  return {
    // 共通のバリデーション
    common: {
      required: z.string().min(1, message.validation.common.required),
      minLength: (min: number) => z.string().min(min, message.validation.common.minLength(min)),
      maxLength: (max: number) => z.string().max(max, message.validation.common.maxLength(max)),
      range: (min: number, max: number) => z.number().min(min).max(max, message.validation.common.range(min, max))
    },

    // メールバリデーション
    email: z.string().email(message.validation.email.invalid),

    // URLバリデーション
    url: z.string().url(message.validation.url.invalid),

    // 電話番号バリデーション
    phone: z.string().min(1, message.validation.phone.required),

    // 地図座標バリデーション
    map: {
      latitude: z.string()
        .min(1, message.validation.map.latitude.required)
        .refine((value) => {
          const num = parseFloat(value)
          return !isNaN(num) && num >= -90 && num <= 90
        }, message.validation.map.latitude.range),
      longitude: z.string()
        .min(1, message.validation.map.longitude.required)
        .refine((value) => {
          const num = parseFloat(value)
          return !isNaN(num) && num >= -180 && num <= 180
        }, message.validation.map.longitude.range)
    },

    // テキストバリデーション
    text: z.string().min(1, message.validation.text.required),

    // SMSバリデーション
    sms: z.object({
      phoneNumber: z.string(),
      body: z.string()
    }).refine(
      (data) => !(data.phoneNumber === '' && data.body === ''),
      {
        message: message.validation.sms.bothEmpty,
        path: ['phoneNumber', 'body']
      }
    ),

    // デバイスバリデーション
    device: z.object({
      devices: z.array(z.any()).min(1, message.validation.device.minSelection)
    })
  }
}