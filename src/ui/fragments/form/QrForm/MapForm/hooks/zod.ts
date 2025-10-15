import { z } from 'zod'
import { getLocale } from '@/locales/config/languages'

const language = z.string()

// 緯度のバリデーション（-90から90の範囲）
const latitude = z
  .string()
  .min(1, {
    message: '緯度を入力してください'
  })
  .refine(
    (value) => {
      const num = parseFloat(value)
      return !isNaN(num) && num >= -90 && num <= 90
    },
    {
      message: '緯度は-90から90の範囲で入力してください'
    }
  )

// 経度のバリデーション（-180から180の範囲）
const longitude = z
  .string()
  .min(1, {
    message: '経度を入力してください'
  })
  .refine(
    (value) => {
      const num = parseFloat(value)
      return !isNaN(num) && num >= -180 && num <= 180
    },
    {
      message: '経度は-180から180の範囲で入力してください'
    }
  )

export const registerQrCodeMapSchema = z
  .object({
    latitude,
    longitude,
    language
  })
  .refine(
    (data) => {
      const locale = getLocale(data.language)
      const { message } = locale

      // 緯度のバリデーション
      if (!data.latitude) {
        return false
      }
      const latNum = parseFloat(data.latitude)
      if (isNaN(latNum) || latNum < -90 || latNum > 90) {
        return false
      }

      // 経度のバリデーション
      if (!data.longitude) {
        return false
      }
      const lngNum = parseFloat(data.longitude)
      if (isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
        return false
      }

      return true
    },
    (data) => {
      const locale = getLocale(data.language)
      const { message } = locale

      if (!data.latitude) {
        return {
          message: message.validation.map.latitude.required,
          path: ['latitude']
        }
      }

      const latNum = parseFloat(data.latitude)
      if (isNaN(latNum) || latNum < -90 || latNum > 90) {
        return {
          message: message.validation.map.latitude.range,
          path: ['latitude']
        }
      }

      if (!data.longitude) {
        return {
          message: message.validation.map.longitude.required,
          path: ['longitude']
        }
      }

      const lngNum = parseFloat(data.longitude)
      if (isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
        return {
          message: message.validation.map.longitude.range,
          path: ['longitude']
        }
      }

      return {
        message: '',
        path: []
      }
    }
  )

// 型推論
export type RegisterQrCodeMapSchema = z.infer<typeof registerQrCodeMapSchema>
