import { z } from 'zod'
import { WiFiPassword } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

export const createWiFiPasswordZodSchema = (language: Language) =>
  z.string().transform((value, ctx) => {
    const result = WiFiPassword.create(value, language)
    if (result.isFailure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.error!.message
      })
      return z.NEVER
    }
    return result.wifiPassword!
  })
