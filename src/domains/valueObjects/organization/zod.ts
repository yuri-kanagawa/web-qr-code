import { z } from 'zod'
import { Organization } from './valueObject'
import { Language } from '@/domains/valueObjects/language'

export const createOrganizationZodSchema = (language: Language) =>
  z.string().transform((value, ctx) => {
    const result = Organization.create(value, language)
    if (result.isFailure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.error!.message
      })
      return z.NEVER
    }
    return result.organization!
  })
