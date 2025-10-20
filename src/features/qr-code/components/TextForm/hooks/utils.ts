import { RegisterQrCodeTextSchema } from './zod'

export const isTextSchema = (value: string) =>
  !value.startsWith('tel:') &&
  !value.startsWith('sms:') &&
  !value.startsWith('http')
export function toTextSchema(value: RegisterQrCodeTextSchema) {
  return value.text
}
export const fromTextScheme = (value: string): RegisterQrCodeTextSchema => {
  return {
    text: value
  }
}
