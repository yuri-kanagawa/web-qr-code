import { Language } from '@/domains'
import { z } from 'zod'

export const createRegisterQrCodeSmsSchema = (language: Language) =>
  z
    .object({
      phoneNumber: z.string(),
      body: z.string()
    })
    .refine((data) => !(data.phoneNumber === '' && data.body === ''), {
      message: language.getLocale().message.validation.sms.bothEmpty,
      path: ['phoneNumber', 'body']
    })

export type RegisterQrCodeSmsSchema = {
  phoneNumber: string
  body: string
}
