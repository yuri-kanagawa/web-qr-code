import { z } from 'zod'
import { Body } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

export const createBodyZodSchema = (language: Language) =>
  z.string().transform((value, ctx) => {
    // 空文字列の場合は許容
    if (value.trim().length === 0) {
      return Body.empty(language)
    }
    
    const result = Body.create(value, language)
    if (result.isFailure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.error!.message
      })
      return z.NEVER
    }
    return result.body!
  })
