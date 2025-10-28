import { Language } from '@/domains/valueObjects/language'
import { z } from 'zod'
import { Url } from './valueObject'

export const createUrlZodSchema = (language: Language) =>
  z.string().transform((value, ctx) => {
    // 空文字列の場合は許容
    if (value.trim().length === 0) {
      return Url.empty(language)
    }

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
