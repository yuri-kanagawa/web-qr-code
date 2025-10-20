import {
  Language,
  createAddressZodSchema,
  createEmailZodSchema,
  createNameZodSchema,
  createOrganizationZodSchema,
  createPhoneNumberZodSchema,
  createPostZodSchema,
  createUrlZodSchema
} from '@/domains'
import { z } from 'zod'

export const createRegisterQrCodeContactSchema = (language: Language) =>
  z
    .object({
      firstName: createNameZodSchema(language),
      lastName: createNameZodSchema(language),
      middleName: createNameZodSchema(language),
      email: createEmailZodSchema(language),
      mobilePhone: createPhoneNumberZodSchema(language),
      homePhone: createPhoneNumberZodSchema(language),
      homeAddress: createAddressZodSchema(language),
      homeUrl: createUrlZodSchema(language),
      organization: createOrganizationZodSchema(language),
      post: createPostZodSchema(language),
      workMobile: createPhoneNumberZodSchema(language),
      workPhone: createPhoneNumberZodSchema(language),
      workAddress: createAddressZodSchema(language),
      workUrl: createUrlZodSchema(language)
    })
    .refine(
      (data) => {
        // 最低限の入力が必要：名前（姓または名）またはメールアドレス
        const hasName =
          (data.firstName && data.firstName !== '') ||
          (data.lastName && data.lastName !== '')
        const hasEmail = data.email && data.email !== ''
        return hasName || hasEmail
      },
      {
        message: language.isEnglish
          ? 'Please enter at least a name (first name or last name) or email address'
          : '最低限、名前（姓または名）またはメールアドレスを入力してください',
        path: ['firstName'] // エラーメッセージを表示するフィールド
      }
    )

export type RegisterQrCodeContactSchema = {
  firstName: string
  lastName: string
  middleName: string
  email: string
  mobilePhone: string
  homePhone: string
  homeAddress: string
  homeUrl: string
  organization: string
  post: string
  workMobile: string
  workPhone: string
  workAddress: string
  workUrl: string
}
