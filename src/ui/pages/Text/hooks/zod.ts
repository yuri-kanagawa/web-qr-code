import { z } from 'zod'

const text = z.string()

export const registerQrCodeTextSchema = z
  .object({
    text
  })
  .refine(
    (data) => {
      return data.text.length > 0
    },
    (data) => {
      return {
        message: '入力してください',
        path: ['text']
      }
    }
  )

export type RegisterQrCodeTextSchema = z.infer<typeof registerQrCodeTextSchema>
