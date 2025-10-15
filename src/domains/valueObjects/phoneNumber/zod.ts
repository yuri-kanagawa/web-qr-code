import { z } from 'zod'
import { PhoneNumber } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

export const createPhoneNumberZodSchema = (language: Language) =>
  z.string().transform((value, ctx) => {
    const result = PhoneNumber.create(value, language)
    if (result.isFailure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.error!.message
      })
      return z.NEVER
    }
    return result.phoneNumber!
  })
