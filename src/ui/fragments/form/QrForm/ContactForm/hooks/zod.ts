import {
  Language,
  createNameZodSchema,
  createEmailZodSchema,
  createPhoneNumberZodSchema,
  createOrganizationZodSchema,
  createPostZodSchema,
  createAddressZodSchema,
  createUrlZodSchema
} from '@/domains'
import { z } from 'zod'

export const createRegisterQrCodeContactSchema = (language: Language) =>
  z.object({
    firstName: createNameZodSchema(language),
    lastName: createNameZodSchema(language),
    middleName: createNameZodSchema(language),
    phoneNumber: createPhoneNumberZodSchema(language),
    organization: createOrganizationZodSchema(language),
    post: createPostZodSchema(language),
    businessCellularTelephone: createPhoneNumberZodSchema(language),
    privateCellularTelephone: createPhoneNumberZodSchema(language),
    email: createEmailZodSchema(language),
    address: createAddressZodSchema(language),
    url: createUrlZodSchema(language)
  })

export type RegisterQrCodeContactSchema = {
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: string
  organization: string
  post: string
  businessCellularTelephone: string
  privateCellularTelephone: string
  email: string
  address: string
  url: string
}
