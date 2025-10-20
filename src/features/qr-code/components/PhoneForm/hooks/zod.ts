import { PhoneNumber } from '@/domains/valueObjects/phoneNumber'
import { z } from 'zod'

export const phoneNumber = z.string().refine(
  (data) => {
    // 空文字列は許可
    if (data.trim().length === 0) {
      return true
    }
    return PhoneNumber.isValidFormat(data)
  },
  {
    message: 'Invalid phone number format'
  }
)

export const registerQrCodePhoneSchema = z.object({
  phoneNumber
})
export type RegisterQrCodePhoneSchema = z.infer<
  typeof registerQrCodePhoneSchema
>
