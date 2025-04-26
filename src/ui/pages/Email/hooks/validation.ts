import { z } from 'zod'

// URL のバリデーションルール（カスタムルールも追加可能）
const email = z.string().email('URLが無効です')

// スキーマ
export const registerQrCodeEmailSchema = z.object({
  email
})

// 型推論
export type RegisterQrCodeEmailSchema = z.infer<
  typeof registerQrCodeEmailSchema
>
