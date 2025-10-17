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
  z.object({
    firstName: createNameZodSchema(language),
    lastName: createNameZodSchema(language),
    middleName: createNameZodSchema(language),
    email: createEmailZodSchema(language),
    phoneNumber: createPhoneNumberZodSchema(language),
    homeAddress: createAddressZodSchema(language),
    homeUrl: createUrlZodSchema(language),
    organization: createOrganizationZodSchema(language),
    post: createPostZodSchema(language),
    workPhone: createPhoneNumberZodSchema(language),
    workAddress: createAddressZodSchema(language),
    workUrl: createUrlZodSchema(language)
  })

export type RegisterQrCodeContactSchema = {
  firstName: string
  lastName: string
  middleName: string
  email: string
  phoneNumber: string
  homeAddress: string
  homeUrl: string
  organization: string
  post: string
  workPhone: string
  workAddress: string
  workUrl: string
}
