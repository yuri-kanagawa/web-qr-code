import { Language } from '@/domains'
import { PhoneNumber } from '@/domains/valueObjects/phoneNumber'
import { z } from 'zod'

export const createRegisterQrCodeSmsSchema = (language: Language) =>
  z
    .object({
      phoneNumber: z.string().refine(
        (value) => {
          // 空文字列は許可
          if (value.trim().length === 0) {
            return true
          }
          return PhoneNumber.isValidFormat(value)
        },
        {
          message: language.locale.message.validation.phone.pleaseEnterValid
        }
      ),
      body: z.string()
    })
    .refine((data) => !(data.phoneNumber === '' && data.body === ''), {
      message: language.locale.message.validation.sms.bothEmpty,
      path: ['phoneNumber', 'body']
    })

export type RegisterQrCodeSmsSchema = {
  phoneNumber: string
  body: string
}
