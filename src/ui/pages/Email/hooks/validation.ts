import { z } from 'zod'

// URL のバリデーションルール（カスタムルールも追加可能）
const email = z.string().email('メールが無効')
const subject = z.string()
const body = z.string()

// スキーマ
export const registerQrCodeEmailSchema = z.object({
  email,
  subject,
  body
})

// 型推論
export type RegisterQrCodeEmailSchema = z.infer<
  typeof registerQrCodeEmailSchema
>
