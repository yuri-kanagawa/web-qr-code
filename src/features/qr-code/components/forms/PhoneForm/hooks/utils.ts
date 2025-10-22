import { RegisterQrCodePhoneSchema } from './zod'

export const isTelScheme = (value: string) => value.startsWith('tel')
export const toTelScheme = (value: RegisterQrCodePhoneSchema) =>
  `tel:${value.phoneNumber}`
export const fromTelScheme = (value: string) => {
  if (value.startsWith('tel:')) {
    return value.slice(4)
  }
  return value
}
