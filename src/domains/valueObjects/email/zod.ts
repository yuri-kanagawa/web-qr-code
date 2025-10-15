import { z } from 'zod'
import { Email } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

export const createEmailZodSchema = (language: Language) =>
  z.string().transform((value, ctx) => {
    const result = Email.create(value, language)
    if (result.isFailure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.error!.message
      })
      return z.NEVER
    }
    return result.email!
  })
