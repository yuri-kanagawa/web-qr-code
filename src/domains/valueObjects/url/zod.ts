import { z } from 'zod'
import { Url } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

export const createUrlZodSchema = (language: Language) =>
  z.string().transform((value, ctx) => {
    const result = Url.create(value, language)
    if (result.isFailure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.error!.message
      })
      return z.NEVER
    }
    return result.url!
  })
