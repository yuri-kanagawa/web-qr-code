import {
  Language,
  LanguageKey,
  createBodyZodSchema,
  createEmailZodSchema,
  createSubjectZodSchema
} from '@/domains'
import { Email } from '@/domains/valueObjects/email'
import { Subject } from '@/domains/valueObjects/subject'
import { Body } from '@/domains/valueObjects/body'
import { z } from 'zod'

export const createRegisterQrCodeEmailSchema = (language: Language) =>
  z
    .object({
      email: createEmailZodSchema(language),
      subject: createSubjectZodSchema(language),
      body: createBodyZodSchema(language),
      language: z.custom<LanguageKey>()
    })
    .superRefine((data, ctx) => {
      const hasEmail = !data.email.isEmpty
      const hasSubject = !data.subject.isEmpty
      const hasBody = !data.body.isEmpty

      // 少なくとも1つのフィールドに値が入っているかチェック
      if (!hasEmail && !hasSubject && !hasBody) {
        const locale = language.locale
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: locale.message.validation.email.atLeastOneField,
          path: ['email']
        })
      }
    })

export type RegisterQrCodeEmailSchema = {
  email: Email
  subject: Subject
  body: Body
  language: LanguageKey
}
