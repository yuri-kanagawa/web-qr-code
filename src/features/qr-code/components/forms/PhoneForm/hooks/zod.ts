import { createPhoneNumberZodSchema } from '@/domains/valueObjects/phoneNumber/zod'
import { z } from 'zod'

export const createRegisterQrCodePhoneSchema = (language: any) =>
  z.object({
    phoneNumber: createPhoneNumberZodSchema(language)
  })

export type RegisterQrCodePhoneSchema = z.infer<
  ReturnType<typeof createRegisterQrCodePhoneSchema>
>
