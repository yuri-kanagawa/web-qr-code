import {
  Language,
  LanguageKey,
  createBodyZodSchema,
  createEmailZodSchema,
  createSubjectZodSchema
} from '@/domains'
import { z } from 'zod'

export const createRegisterQrCodeEmailSchema = (language: Language) =>
  z.object({
    email: createEmailZodSchema(language),
    subject: createSubjectZodSchema(language),
    body: createBodyZodSchema(language),
    language: z.custom<LanguageKey>()
  })

export type RegisterQrCodeEmailSchema = {
  email: string
  subject: string
  body: string
  language: LanguageKey
}
