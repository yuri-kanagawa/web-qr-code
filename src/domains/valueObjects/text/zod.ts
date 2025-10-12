import { z } from 'zod'
import { Text } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

export const createTextZodSchema = (language: Language) =>
  z.string()
    .transform((value, ctx) => {
      const result = Text.create(value, language)
      if (result.isFailure) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: result.error!.message,
        })
        return z.NEVER
      }
      return result.text!
    })
