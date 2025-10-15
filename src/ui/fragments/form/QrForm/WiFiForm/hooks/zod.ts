import { z } from 'zod'

const ssid = z.string()
const password = z.string()
const type = z.string()

// スキーマ
export const registerQrCodeWiFiSchema = z.object({
  ssid,
  password,
  type
})

// 型推論
export type RegisterQrCodeWiFiSchema = z.infer<typeof registerQrCodeWiFiSchema>
