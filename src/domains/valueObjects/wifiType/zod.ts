import { z } from 'zod'
import { WiFiType } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

export const createWiFiTypeZodSchema = (language: Language) =>
  z.string().transform((value, ctx) => {
    const result = WiFiType.create(value, language)
    if (result.isFailure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.error!.message
      })
      return z.NEVER
    }
    return result.wifiType!
  })
