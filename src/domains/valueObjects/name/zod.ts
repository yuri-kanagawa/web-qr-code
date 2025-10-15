import { z } from 'zod'
import { Name } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

export const createNameZodSchema = (language: Language) =>
  z.string().transform((value, ctx) => {
    const result = Name.create(value, language)
    if (result.isFailure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.error!.message
      })
      return z.NEVER
    }
    return result.name!
  })
