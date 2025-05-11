import { z } from 'zod'
import { validateInternationalPhoneNumber } from '@/utils/regexp'

export const phoneNumber = z
  .string()
  .refine((data) => validateInternationalPhoneNumber(data), {
    message: 'Invalid phone number'
  })

export const registerQrCodePhoneSchema = z.object({
  phoneNumber
})
export type RegisterQrCodePhoneSchema = z.infer<
  typeof registerQrCodePhoneSchema
>
