import { z } from 'zod'
import { Subject } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

export const createSubjectZodSchema = (language: Language) =>
  z.string().transform((value, ctx) => {
    const result = Subject.create(value, language)
    if (result.isFailure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.error!.message
      })
      return z.NEVER
    }
    return result.subject!
  })
