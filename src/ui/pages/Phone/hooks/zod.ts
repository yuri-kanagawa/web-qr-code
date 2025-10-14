import { z } from 'zod'
import { PhoneNumber } from '@/domains/valueObjects/phoneNumber'

export const phoneNumber = z
  .string()
  .refine((data) => PhoneNumber.isValidInternationalFormat(data), {
    message: 'Invalid phone number'
  })

export const registerQrCodePhoneSchema = z.object({
  phoneNumber
})
export type RegisterQrCodePhoneSchema = z.infer<
  typeof registerQrCodePhoneSchema
>
