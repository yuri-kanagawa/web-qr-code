import { Language, createTextZodSchema } from '@/domains'
import { z } from 'zod'

export const createRegisterQrCodeTextSchema = (language: Language) =>
  z.object({
    text: createTextZodSchema(language)
  })

export type RegisterQrCodeTextSchema = {
  text: string
}
