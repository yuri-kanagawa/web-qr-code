import { RegisterQrCodeSmsSchema } from "./zod"

export const isSms = (value: string) => value.startsWith('sms')
export const formatSms = (value: RegisterQrCodeSmsSchema) => {
  return `sms:${value.phoneNumber}?body=${value.body}`
}