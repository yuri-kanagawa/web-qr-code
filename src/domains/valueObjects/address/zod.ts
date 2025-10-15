import { z } from 'zod'
import { Address } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

export const createAddressZodSchema = (language: Language) =>
  z.string().transform((value, ctx) => {
    const result = Address.create(value, language)
    if (result.isFailure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.error!.message
      })
      return z.NEVER
    }
    return result.address!
  })
