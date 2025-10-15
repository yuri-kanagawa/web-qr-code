import { Language, LanguageKey, createUrlZodSchema } from '@/domains'
import { z } from 'zod'

export const createRegisterQrCodeUrlSchema = (language: Language) =>
  z.object({
    url: createUrlZodSchema(language),
    language: z.custom<LanguageKey>()
  })

export type RegisterQrCodeUrlSchema = {
  url: string
  language: LanguageKey
}
