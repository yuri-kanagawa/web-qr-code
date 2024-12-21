import { z } from 'zod'

// URL のバリデーションルール（カスタムルールも追加可能）
const url = z.string().url('URLが無効です')

// スキーマ
export const registerQrCodeUrlSchema = z.object({
  url
})

// 型推論
export type RegisterQrCodeUrlSchema = z.infer<typeof registerQrCodeUrlSchema>
