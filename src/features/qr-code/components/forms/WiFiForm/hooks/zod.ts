import {
  Language,
  createWiFiSsidZodSchema,
  createWiFiPasswordZodSchema,
  createWiFiTypeZodSchema
} from '@/domains'
import { z } from 'zod'

export const createRegisterQrCodeWiFiSchema = (language: Language) =>
  z.object({
    ssid: createWiFiSsidZodSchema(language),
    password: createWiFiPasswordZodSchema(language),
    type: createWiFiTypeZodSchema(language)
  })

export type RegisterQrCodeWiFiSchema = {
  ssid: string
  password: string
  type: string
}
