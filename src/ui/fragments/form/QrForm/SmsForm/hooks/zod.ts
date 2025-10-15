import { z } from 'zod'

const phoneNumber = z.string()
const body = z.string()
export const registerQrCodeSmsSchema = z
  .object({
    phoneNumber,
    body
  })
  .refine((data) => !(data.phoneNumber === '' && data.body === ''), {
    message: '電話番号と本文の両方を空にはできません',
    path: ['phoneNumber', 'body'] // または ['body'] など、どちらかにエラーを表示
  })

export type RegisterQrCodeSmsSchema = z.infer<typeof registerQrCodeSmsSchema>
